const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Controllers
// In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const home = async (req, res) => {
  try {
    res.status(200).send("This is Registration and Authentication page info");
  } catch (error) {
    res.status(500).json("internal server error at register");
  }
};

// Registration logic
// 1. Get Registration Data: Retrieve user data (username, email, password)
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash Password: Securely hash the password.
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database.
// 6. Respond: Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exist" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(201)
      .json({
        msg: "Registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });

//  In most cases, converting _id to a string is a good practice because it ensures consistency and compatibility across different JWT libraries and systems. It also aligns with the expectation that claims in a JWT are represented as strings.

  } catch (error) {
    res.status(500).json("internal server error at register");
  }
};


// Login Logic
const login = async(req, res) => {
    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({email});

        if(!userExist) {
            res.status(500).json({msg: "Invalid Credentials"});
        }
        
        const isValid = await userExist.comparePassword(password);
        
        if(isValid) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({
                msg: "Invalid email or password"
            })  
        }

        res.status(200).json(userExist);

    } catch(error) {
        res.status(500).json({msg: "internal server error at register"});
    }
}

module.exports = { home, register, login };
