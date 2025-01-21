const Contact = require("../models/contact-model");

const allContactData = async (req, res, next) => {
    try {
        const response = await Contact.find();

        if(!response || response.length === 0) {
            res.status(404).json({message: "No Contact Found"});
        }

        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

module.exports = allContactData;