import { useState } from 'react';

// TODO : make this typescript for better handling of fields
// TODO : get this working with autocomplete for fields!
export const useFormFields = (initialValues = {}) => {
    const [formFields, setFormFields] = useState(initialValues);
    const updateFormFields = (key) => (e) => {
        const value = e.target.value;
        setFormFields((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    return { formFields, updateFormFields };
};
