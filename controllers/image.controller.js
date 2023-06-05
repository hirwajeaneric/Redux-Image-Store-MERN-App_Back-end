const ImageModel = require('../models/image.modal');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const multer = require('multer');
const imageModal = require('../models/image.modal');

const getAll = async(req, res, next) => {
    const images = await ImageModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: images.length, images })
};

const findById = async(req, res, next) => {
    const imageId = req.query.id;
    const image = await ImageModel.findById(imageId)
    res.status(200).json({ image });
};

// Establishing a multer storage
const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, './uploads') },
    filename: (req, file, callback) => { callback(null, `img-${file.originalname}`) }
})

// Filter files with multer
const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback("Not an image! Please upload only images.", false);
    }
  };

const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter 
});

// Middleware for attaching files to the request body before saving.
const attachFile = (req, res, next) => {
    if (req.file) {
        req.body.name = req.file.filename;
        next();
    } else {
        next();
    }
}

const add = async(req, res, next) => {
    const recordedImage = await ImageModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: "Image recorded!", image: recordedImage });
};

const update = async(req, res, next) => {
    const image = await ImageModel.findByIdAndUpdate({ _id: req.query.id }, req.body);
    const updatedImage = await ImageModel.findById(image._id);

    res.status(StatusCodes.OK).json({ message: "Image data updated!", image: updatedImage });
};

const remove = async(req, res, next) => {
    const deletedImage = await ImageModel.findByIdAndDelete(req.query.id);
    
    if (!deletedImage) {
        throw new NotFoundError(`Failed to delete account.`);
    }
    
    res.status(StatusCodes.OK).json({ message: "Image deleted!" });
};

const removeAll = async(req, res, next) => {
    const deletedImage = await ImageModel.deleteMany(); 
    res.status(StatusCodes.OK).json({ message: "All images deleted!" });
};

module.exports = { getAll, findById, add, update, upload, remove, removeAll, attachFile }
