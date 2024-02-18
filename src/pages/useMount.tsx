import { useEffect, useRef, useState } from 'react';

/**
 * 用于执行一些初始化操作，例如创建 canvas context 等耗时操作
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useMount(fn: () => void) {
    useEffect(() => {
        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default function Page() {
    const [count, setCount] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    console.log('call component function');

    useMount(async () => {
        console.log('mount');
        console.log(`can ${buttonRef.current ? '' : 'not '}access DOM when mount`);
    });

    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    );
}
