import { useEffect, useState } from 'react';

/**
 * https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useDebounce/index.ts
 */
function useDebounce<T>(stateValue: T, wait: number): T {
    const [val, setVal] = useState(stateValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVal(stateValue);
        }, wait);

        return () => {
            clearTimeout(timer);
        };
    }, [stateValue, wait]);

    return val;
}

export default function Page() {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value, 500);

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Typed value"
                style={{ width: 280 }}
            />
            <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
        </div>
    );
}
