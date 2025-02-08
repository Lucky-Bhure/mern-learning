const Course = require("../models/course-model");

const allCoursesData = async( req, res, next) => {
    try {
        const response = await Course.find();

        if(!response || response.length === 0) {
            res.status(404).json({message: "No Course Found"});
        }

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = allCoursesData;