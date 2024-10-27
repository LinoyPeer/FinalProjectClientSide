import Joi from "joi";
import { useCallback, useState } from "react";

export default function useForm(initialData, schema, handleSubmit) {

    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validateProperty = useCallback((name, value) => {
        if (!schema[name]) return null;

        const joiSchema = Joi.object({ [name]: schema[name] });
        const { error } = joiSchema.validate({ [name]: value });
        return error ? error.details[0].message : null;
    }, [schema, data]);


    const handleChange = useCallback((e) => {
        let value = e.target.value;
        let name = e.target.name;
        console.log(name);

        const errorMessage = validateProperty(name, value);

        if (errorMessage) {
            setErrors((prev) => ({ ...prev, [name]: errorMessage }));
        } else {
            setErrors((prev) => {
                let prevObj = { ...prev };
                delete prevObj[name];
                return prevObj;
            });
        }

        setData((prev) => ({ ...prev, [name]: value }));
        console.log(value);
    }, [validateProperty]);

    const handleReset = useCallback(() => {
        setData(initialData);
        setErrors([]);
    }, [initialData]);

    const onSubmit = useCallback(() => {
        handleSubmit(data)
    }, [data]);

    return { handleChange, handleReset, onSubmit, data, errors, setData, setErrors }
}
