import { useCallback, useState, type ChangeEvent } from 'react';

export default function PhoneNumberInput() {
    const [value, setValue] = useState<string>('');

    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        if (!/^[\d()-]*$/.test(newValue)) return;

        newValue = newValue.replaceAll(/\(|\)|-/g, '').slice(0, 10);
        if (newValue.length > 6) {
            newValue = newValue.slice(0, 6) + '-' + newValue.slice(6);
        }

        if (newValue.length > 3) {
            newValue = '(' + newValue.slice(0, 3) + ')' + newValue.slice(3);
        }

        setValue(newValue);
    }, []);
    // your code here

    return <input data-testid="phone-number-input" value={value} onInput={handleInput} />;
}
