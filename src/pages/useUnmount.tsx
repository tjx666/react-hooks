import { useEffect, useRef, useState } from 'react';

/**
 * 在组件卸载（unmount）时执行的 Hook
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useUnmount(fn: () => void) {
    const fnRef = useRef(fn);
    fnRef.current = fn;

    useEffect(() => {
        return () => {
            // 使用 ref 存储最新的 fn 是为了让 fn 中引用的 state 事最新的
            fnRef.current();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

function Drawing() {
    const [count, setCount] = useState(0);

    useUnmount(() => {
        console.log('drawing unmounted');
        // !: 此时 count 应该是最新的数据
        console.log('count:', count);
    });

    return (
        <figure
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <figcaption>{count}</figcaption>
            <img
                style={{
                    width: 600,
                    height: 250,
                }}
                onClick={() => setCount(count + 1)}
                src="https://w.wallhaven.cc/full/2y/wallhaven-2yjp5m.jpg"
                alt="girl"
            />
        </figure>
    );
}

export default function Page() {
    const [expand, setExpand] = useState(false);

    console.log('call component function');

    return (
        <>
            {expand ? <Drawing /> : null}
            <button onClick={() => setExpand(!expand)}>{expand ? '收起' : '展开'}</button>
        </>
    );
}
