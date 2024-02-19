import { useEffect, useRef, useState } from 'react';

function usePrevious<S>(state: S): S | undefined {
    const previousStateRef = useRef<S | undefined>(undefined);

    useEffect(() => {
        previousStateRef.current = state;
    }, [state]);

    // useEffect 是异步的，所有这里获取的是更新前的 state
    return previousStateRef.current;
}

export default function Page() {
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);
    return (
        <>
            <div>counter current value: {count}</div>
            <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>
            <button type="button" onClick={() => setCount((c) => c + 1)}>
                increase
            </button>
            <button type="button" style={{ marginLeft: 8 }} onClick={() => setCount((c) => c - 1)}>
                decrease
            </button>
        </>
    );
}
