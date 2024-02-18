import { useEffect, useState } from 'react';

type Effect = () => void | (() => void);

/**
 * 用于执行一些初始化操作，例如创建 canvas context 等耗时操作
 */
export function useEffectOnce(effect: Effect) {
    useEffect(() => {
        const cleanup = effect();
        return () => {
            cleanup?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

const HelloWorld = () => {
    useEffectOnce(() => {
        console.log('run effect');

        return () => {
            console.log('cleanup effect');
        };
    });
    return <h1>hello world!</h1>;
};

export default function Page() {
    const [render, setRender] = useState(true);

    console.log('call component function');

    return (
        <>
            {render ? <HelloWorld /> : null}
            <button onClick={() => setRender(!render)}>
                {render ? '隐藏' : '显示'}
            </button>
        </>
    );
}
