import Joi from 'joi';

const signupSchema = {
    fullName: Joi.string().min(3).required().label("Full Name"),
    username: Joi.string().min(6).required().label("Username"),
    email: Joi.string().required().label("Email"),
    phone: Joi.string().min(10).max(15).required().label("Phone"),
    password: Joi.string().min(6).required().label("Password"),
};

export default signupSchema;
