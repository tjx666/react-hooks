import { useCallback, useEffect, useRef, useState } from 'react';

function useInterval(fn: () => void, delay: number) {
    const timerRef = useRef(0);
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        const timer = setInterval(() => {
            fnRef.current();
        }, delay);
        timerRef.current = timer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return useCallback(() => {
        clearInterval(timerRef.current);
    }, []);
}

export default function Page() {
    const [count, setCount] = useState(0);

    useInterval(() => {
        setCount(count + 1);
    }, 1000);

    return <div>count: {count}</div>;
}
