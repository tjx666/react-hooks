import { useEffect, useState, EffectCallback, DependencyList, useRef } from 'react';

function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
    const isFirstRunRef = useRef(true);

    useEffect(() => {
        if (isFirstRunRef.current) {
            isFirstRunRef.current = false;
            return;
        }

        const recycle = effect();
        return () => recycle?.();
    }, deps);
}

export default function Page() {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        setEffectCount((c) => c + 1);
    }, [count]);

    useUpdateEffect(() => {
        setUpdateEffectCount((c) => c + 1);
        return () => {
            // do something
        };
    }, [count]); // you can include deps array if necessary

    return (
        <div>
            <p>effectCount: {effectCount}</p>
            <p>updateEffectCount: {updateEffectCount}</p>
            <p>
                <button type="button" onClick={() => setCount((c) => c + 1)}>
                    reRender
                </button>
            </p>
        </div>
    );
}
