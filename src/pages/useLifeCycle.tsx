import { useEffect, useRef, useState } from 'react';

function useLifeCycle<MountRet extends unknown[] | void = void>(
    onMount: () => MountRet,
    onUnmount: (...args: MountRet extends void ? [] : MountRet) => void,
) {
    // 用于触发 render
    const [, setState] = useState({});
    const hadRunMountRef = useRef(false);
    // 其实也就是第二次 render 的时候
    const renderAfterTwiceEffectRef = useRef(false);
    // 这里保存最新的 unmount 函数确保引用了最新的 state
    const unmountRef = useRef(onUnmount);

    if (hadRunMountRef.current === true) {
        renderAfterTwiceEffectRef.current = true;
    }

    useEffect(() => {
        unmountRef.current = onUnmount;
    }, [onUnmount]);

    useEffect(() => {
        if (hadRunMountRef.current) return;

        const mountRet = onMount();
        hadRunMountRef.current = true;

        // 触发二次 render
        setState({});

        return () => {
            if (renderAfterTwiceEffectRef.current) {
                // @ts-expect-error 类型不好处理
                unmountRef.current(...(Array.isArray(mountRet) ? mountRet : []));
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default function Page() {
    const [pressedKey, setPressedKey] = useState('');

    useEffect(() => {
        console.log('useEffect.mount');
        return () => {
            console.log('useEffect.unmount');
        };
    }, []);

    useLifeCycle(
        () => {
            console.log('useLifeCycle.mount');
            const handler = (e: KeyboardEvent) => {
                setPressedKey(e.key);
            };
            window.addEventListener('keydown', handler);
            return [handler];
        },
        (handler) => {
            console.log('useLifeCycle.unmount');
            window.removeEventListener('keydown', handler);
        },
    );

    return (
        <>
            <span>你按下了：</span>
            <output>{pressedKey}</output>
        </>
    );
}
