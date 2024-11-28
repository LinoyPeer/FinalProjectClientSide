import Joi from 'joi';

const loginSchema = {
    username: Joi.string().min(2).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
};

export default loginSchema;