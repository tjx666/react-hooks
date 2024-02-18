import { useEffect, useRef, useState } from 'react';

/**
 * 如果是对组件内元素添加事件直接用 onXxx 就行了，这里主要考虑简化对 window 添加事件
 * 作用：
 * 1. 避免些 addEventListener/removeEventLister 这些模版代码
 * 2. 避免重复 add/remove 开销
 *
 * react-use 是直接将 handler 作为 deps：https://github.com/streamich/react-use/blob/master/src/useEvent.ts
 * ahooks 和这里做法一样：https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useEventListener/index.ts
 */
function useEventListener<E extends Event>(
    event: string,
    callback: (event: E) => void,
    target: Window | Document = window,
) {
    const handlerRef = useRef<(e: Event) => void>();

    // 要保证 handler 始终是最新的函数
    useEffect(() => {
        // 将重复的 add/remove 转为更新 handler ref
        handlerRef.current = (e: Event) => {
            callback(e as E);
        };
    }, [callback]);

    useEffect(() => {
        console.log('add listener');
        target.addEventListener(event, handlerRef.current!);

        return () => {
            console.log('remove listener');
            target.removeEventListener(event, handlerRef.current!);
        };
        // !: 这里没有吧 callback 添加到 deps，就是避免重复 add/remove
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event]);
}

function PressKey() {
    const [key, setKey] = useState('');

    useEventListener<KeyboardEvent>('keydown', (e) => {
        setKey(e.key);
    });

    return <kbd>{key}</kbd>;
}

export default function Page() {
    const [render, setRender] = useState(true);

    return (
        <>
            {render ? (
                <h2>
                    pressed key: <PressKey />
                </h2>
            ) : null}
            <button onClick={() => setRender(!render)}>{render ? '隐藏' : '显示'}</button>
        </>
    );
}
