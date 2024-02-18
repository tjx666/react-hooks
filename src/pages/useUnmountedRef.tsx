import { useRef, useState } from 'react';
import { useUnmount } from './useUnmount';
import { useMount } from './useMount';

/**
 * 作用：获取当前组件是否已经销毁
 * 场景：例如获取接口数据返回后判断组件是否已经卸载，卸载了的化就没必要执行后序操作了
 */
function useUnmountedRef() {
    const ref = useRef(false);
    useUnmount(() => {
        ref.current = true;
    });
    return ref;
}

function Drawing() {
    const unmountedRef = useUnmountedRef();

    useMount(() => {
        console.log('mount');
        console.log('unmounted? ', unmountedRef.current);
    });

    useUnmount(() => {
        console.log('unmount');
        console.log('unmounted? ', unmountedRef.current);
        setTimeout(() => {
            console.log('unmounted');
            console.log('unmounted? ', unmountedRef.current);
        }, 100);
        unmountedRef.current = true;
    });

    return (
        <figure
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img
                style={{
                    width: 600,
                    height: 250,
                }}
                src="https://w.wallhaven.cc/full/2y/wallhaven-2yjp5m.jpg"
                alt="girl"
            />
        </figure>
    );
}

export default function Page() {
    const [expand, setExpand] = useState(false);

    return (
        <>
            {expand ? <Drawing /> : null}
            <button onClick={() => setExpand(!expand)}>{expand ? '收起' : '展开'}</button>
        </>
    );
}
