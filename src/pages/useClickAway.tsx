import { useState, useRef, useEffect, type RefObject } from 'react';

function useClickAway(callback: () => void, ref: RefObject<HTMLElement>) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (e: Event) => {
            if (!ref.current!.contains(e.target as Node)) {
                callbackRef.current();
            }
        };
        window.addEventListener('click', handler);

        return () => {
            window.removeEventListener('click', handler);
        };
    }, [ref]);
}

export default function Page() {
    const [counter, setCounter] = useState(0);
    const ref = useRef<HTMLButtonElement>(null);
    useClickAway(() => {
        setCounter((s) => s + 1);
    }, ref);

    return (
        <div>
            <button ref={ref} type="button">
                box
            </button>
            <p>counter: {counter}</p>
        </div>
    );
}
