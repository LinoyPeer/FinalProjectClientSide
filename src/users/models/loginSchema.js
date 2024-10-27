import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string().min(6).required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
});

export default loginSchema;
