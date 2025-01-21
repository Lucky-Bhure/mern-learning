const User = require("../models/user-model");

const allUsersData = async(req, res, next) => {
    try {
        const response = await User.find({}, {password: 0});
        if(!response || response.length === 0) {
            res.status(404).json({message: "No User Found"})
        }

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = allUsersData;