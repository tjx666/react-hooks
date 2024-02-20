import { useEffect, useRef, useState } from 'react';

function useThrottle<S>(state: S, wait: number): S {
    const [throttledValue, setThrottledValue] = useState(state);
    const lastUpdateTimestampRef = useRef<number | undefined>(0);
    const isFirstTimeRunEffect = useRef<boolean>(true);

    useEffect(() => {
        let trailingTimer: number | undefined;
        if (!isFirstTimeRunEffect.current) {
            const now = Date.now();
            if (
                // leading
                lastUpdateTimestampRef.current === undefined ||
                now - lastUpdateTimestampRef.current >= wait
            ) {
                setThrottledValue(state);
                lastUpdateTimestampRef.current = now;
            } else {
                // 处理 trailing
                trailingTimer = setTimeout(() => {
                    setThrottledValue(state);
                    lastUpdateTimestampRef.current = now;
                }, wait);
            }
        } else {
            isFirstTimeRunEffect.current = false;
        }

        return () => {
            if (trailingTimer !== undefined) {
                clearTimeout(trailingTimer);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return throttledValue;
}

/**
 * http://localhost:5173/useThrottle
 * https://github.com/alibaba/hooks/issues/2483
 */
export default function Page() {
    const [value, setValue] = useState<string>('');
    const throttledValue = useThrottle(value, 500);

    return (
        <div>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Typed value"
                style={{ width: 280 }}
            />
            <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
        </div>
    );
}
