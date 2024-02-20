import { useMemo, useState } from 'react';

function useReactive<S extends object>(initialState: S) {
    const [state, setState] = useState(initialState);

    return useMemo(() => {
        const weakMap = new WeakMap();
        const observe = (obj: object) => {
            if (weakMap.has(obj)) {
                return weakMap.get(obj);
            }
            const handler: ProxyHandler<object> = {
                set(target, property, newValue, receiver) {
                    const previousValue = Reflect.get(target, property);
                    const success = Reflect.set(target, property, newValue, receiver);
                    if (newValue !== previousValue) {
                        setState({ ...state });
                    }
                    return success;
                },
                get(target, property, receiver) {
                    const value = Reflect.get(target, property);
                    const isObject = typeof value === 'object' && value !== null;
                    if (isObject) return observe(value);
                    return Reflect.get(target, property, receiver);
                },
            };
            const proxyObj = new Proxy(obj, handler);
            weakMap.set(obj, proxyObj);
            return proxyObj;
        };
        return observe(initialState) as S;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default function Page() {
    const state = useReactive({
        count: 0,
        inputVal: '',
        obj: {
            value: '',
        },
    });

    console.log(state.obj === state.obj); //

    return (
        <div>
            <p> state.count:{state.count}</p>

            <button style={{ marginRight: 8 }} onClick={() => state.count++}>
                state.count++
            </button>
            <button onClick={() => state.count--}>state.count--</button>

            <p style={{ marginTop: 20 }}> state.inputVal: {state.inputVal}</p>
            <input onChange={(e) => (state.inputVal = e.target.value)} />

            <p style={{ marginTop: 20 }}> state.obj.value: {state.obj.value}</p>
            <input onChange={(e) => (state.obj.value = e.target.value)} />
        </div>
    );
}
