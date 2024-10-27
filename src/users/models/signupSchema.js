import Joi from 'joi';

const signupSchema = Joi.object({
    fullName: Joi.string().min(3).required().label("Full Name"),
    username: Joi.string().min(6).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().min(10).max(15).required().label("Phone"), // ניתן להתאים את המספרים לפי הצורך
    password: Joi.string().min(6).required().label("Password"),
});

export default signupSchema;
