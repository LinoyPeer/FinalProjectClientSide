import Joi from 'joi';

const uploudSchema = Joi.object({
    title: Joi.string().min(2).max(256).required().messages({
        'any.required': 'Title is required',
        'string.min': 'Title must be at least 2 characters long',
        'string.max': 'Title must be at most 256 characters long',
    }),
    postStatus: Joi.string().min(0).max(1024).allow('').optional().messages({
        'string.min': 'Status must be at least 0 characters long',
        'string.max': 'Status must be at most 1024 characters long',
    }),
    image: Joi.object({
        file: Joi.any().required().messages({
            'any.required': 'Image file is required',
        }),
        alt: Joi.string().min(2).max(256).allow('').optional().messages({
            'string.min': 'Alt text must be at least 2 characters long',
            'string.max': 'Alt text must be at most 256 characters long',
        }),
    }).required().messages({
        'any.required': 'Image is required',
    }),
    user_id: Joi.string().required().messages({
        'any.required': 'User ID is required',
    }),
});



export default uploudSchema;
