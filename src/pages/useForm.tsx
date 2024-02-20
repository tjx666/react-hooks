import { useState, type ChangeEvent } from 'react';

interface FormActions<T> {
    setValue: (field: keyof T, value: T[keyof T]) => void;
    setValues: (values: Partial<T>) => void;
    reset: () => void;
}

function useForm<T>(initialValues: T): [T, FormActions<T>] {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        {
            setValue(field: keyof T, value: T[keyof T]) {
                setValues({
                    ...values,
                    [field]: value,
                });
            },
            setValues(newValues: Partial<T>) {
                setValues({
                    ...values,
                    ...newValues,
                });
            },
            reset() {
                setValues({ ...initialValues });
            },
        },
    ];
}

export default function Page() {
    const initialValues = {
        name: '',
        email: '',
    };

    const [formValues, formActions] = useForm(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        formActions.setValue(name as keyof typeof formValues, value);
    };

    const submit = () => {
        console.log(formValues);
    };

    return (
        <form>
            <label>
                name:
                <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                email:
                <input type="email" name="email" value={formValues.email} onChange={handleChange} />
            </label>
            <br />

            <button onClick={submit}>submit</button>
        </form>
    );
}
