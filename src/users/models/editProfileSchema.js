import Joi from 'joi';

const editProfileSchema = {
    firstName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 3 characters long',
        'string.max': 'First name cannot be longer than 30 characters'
    }),
    middleName: Joi.string().max(30).optional(),
    lastName: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 3 characters long',
        'string.max': 'Last name cannot be longer than 30 characters'
    }),
};

export default editProfileSchema;