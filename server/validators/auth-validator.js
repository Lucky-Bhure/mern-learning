const { z } = require("zod");

// Create LogIn Object Schema
const logInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password not be more than 255 characters" }),
});

// Create SignUp Object Schema
const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(6, { message: "Name must be at least of 6 characters" })
    .max(255, { message: "Name not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Name must be at least of 10 characters" })
    .max(20, { message: "Name not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password not be more than 1024 characters" }),
});

const contactSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(6, { message: "Name must be at least of 6 characters" })
    .max(255, { message: "Name not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  message: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password not be more than 1024 characters" }),
});

module.exports = { signUpSchema, logInSchema, contactSchema };
