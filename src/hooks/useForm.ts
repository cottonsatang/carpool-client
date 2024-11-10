import {useEffect, useState} from "react";

interface UseFormProps<T> {
    initialValue: T;
    validate: (value: T) => Record<keyof T, string>; // validate function for error messages
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const setFieldValue = (field: keyof T, value: T[keyof T]) => {
        setValues((prevValues) => ({...prevValues, [field]: value}));
    };

    const handleChange = (field: keyof T) => (value: T[keyof T]) => {
        setFieldValue(field, value);

        if (validate) {
            const validationErrors = validate({...values, [field]: value});
            setErrors(validationErrors);
        }
    };

    const handleChangeText = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const getTextInputProps = (name: keyof T) => {
        const value = values[name];
        const onChangeText = (text: string) => handleChangeText(name, text);
        const onBlur = () => handleBlur(name);

        return {value, onChangeText, onBlur};
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return {values, errors, touched, getTextInputProps, setFieldValue, handleChange};
}

export default useForm;
