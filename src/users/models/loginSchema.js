import Joi from 'joi';

const loginSchema = {
    username: Joi.string().min(2).required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
};

export default loginSchema;