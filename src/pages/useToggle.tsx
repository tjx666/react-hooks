import { useState } from 'react';

function useToggle<V = boolean>(defaultValue: V = false as V, reversedValue: V = true as V) {
    const [state, setState] = useState(defaultValue);

    return [
        state,
        {
            toggle() {
                setState(state === defaultValue ? reversedValue : defaultValue);
            },
            set(newState: V) {
                setState(newState);
            },
            setLeft() {
                setState(defaultValue);
            },
            setRight() {
                setState(reversedValue);
            },
        },
    ] as const;
}

export default function Page() {
    const [state, { toggle, setLeft, setRight }] = useToggle();

    return (
        <div>
            <p>Effects：{`${state}`}</p>
            <p>
                <button type="button" onClick={toggle}>
                    Toggle
                </button>
                <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
                    Toggle False
                </button>
                <button type="button" onClick={setRight}>
                    Toggle True
                </button>
            </p>
        </div>
    );
}
