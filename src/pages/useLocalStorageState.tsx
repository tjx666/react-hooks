import { useEffect, useState } from 'react';

function useLocalStorageState<V>(key: string, initialValue: V) {
    const [value, setValue] = useState(initialValue);
    const setState = (newValue: V | undefined) => {
        if (newValue === undefined) {
            localStorage.removeItem(key);
            setValue(undefined as V);
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        }
    };

    useEffect(() => {
        const storageValue = localStorage.getItem(key);
        // 之前没有这个
        if (storageValue === null) {
            localStorage.setItem(key, JSON.stringify(initialValue));
        } else {
            setValue(JSON.parse(storageValue));
        }
    }, [initialValue, key]);

    return [value, setState] as const;
}

export default function Page() {
    const [message, setMessage] = useLocalStorageState<string | undefined>(
        'use-local-storage-state-demo1',
        'Hello~',
    );

    return (
        <>
            <input
                value={message || ''}
                placeholder="Please enter some words..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <button style={{ margin: '0 8px' }} type="button" onClick={() => setMessage('Hello~')}>
                Reset
            </button>
            <button type="button" onClick={() => setMessage(undefined)}>
                Clear
            </button>
        </>
    );
}
