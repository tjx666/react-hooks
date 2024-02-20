import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 本质是节流，时间间隔为帧间隔
 */
function useRafState<S>(initialState: S) {
    const [state, setState] = useState(initialState);
    const rafHandleRef = useRef<number | undefined>();

    const setRafState = useCallback((newState: S) => {
        if (rafHandleRef.current !== undefined) {
            cancelAnimationFrame(rafHandleRef.current);
        }

        rafHandleRef.current = requestAnimationFrame(() => {
            setState(newState);
        });

        // 卸载时也要注意取消 raf
        return () => {
            if (rafHandleRef.current !== undefined) {
                cancelAnimationFrame(rafHandleRef.current);
            }
        };
    }, []);

    return [state, setRafState] as const;
}

export default function Page() {
    const [state, setState] = useRafState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const onResize = () => {
            setState({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            });
        };
        onResize();

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div>
            <p>Try to resize the window </p>
            current: {JSON.stringify(state)}
        </div>
    );
}
