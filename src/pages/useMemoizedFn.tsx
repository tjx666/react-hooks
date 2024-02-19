import { useState, useCallback, useRef, useEffect } from 'react';
import { message } from 'antd';

function useMemoizedFn(fn: () => void) {
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    return useCallback(() => {
        fnRef.current();
    }, []);
}

export default function Page() {
    const [count, setCount] = useState(0);

    const callbackFn = useCallback(() => {
        message.info(`Current count is ${count}`);
    }, [count]);

    const memoizedFn = useMemoizedFn(() => {
        message.info(`Current count is ${count}`);
    });

    return (
        <>
            <p>count: {count}</p>
            <button
                type="button"
                onClick={() => {
                    setCount((c) => c + 1);
                }}
            >
                Add Count
            </button>
            <div style={{ marginTop: 16 }}>
                <button type="button" onClick={callbackFn}>
                    call callbackFn
                </button>
                <button type="button" onClick={memoizedFn} style={{ marginLeft: 8 }}>
                    call memoizedFn
                </button>
            </div>
        </>
    );
}
