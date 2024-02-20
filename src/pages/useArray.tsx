import { useState } from 'react';

interface ArrayActions<T> {
    set: (newArray: T[]) => void;
    push: (element: T) => void;
    remove: (index: number) => void;
    clear: () => void;
}

function useArray<T>(initialArray: T[]): [T[], ArrayActions<T>] {
    const [array, setArray] = useState(initialArray);
    return [
        array,
        {
            set(newArray: T[]) {
                setArray(newArray);
            },
            push(element: T) {
                setArray([...array, element]);
            },
            remove(index: number) {
                setArray([...array].splice(index, 1));
            },
            clear() {
                setArray([]);
            },
        },
    ];
}

export default function Page() {
    const [todos, { push, remove, clear }] = useArray<string>([]);

    return (
        <div>
            <button onClick={() => push(`Task ${todos.length + 1}`)}>Add Todo</button>
            <button onClick={clear}>Clear Todos</button>
            {todos.map((todo, index) => (
                <div key={index} onClick={() => remove(index)}>
                    {todo}
                </div>
            ))}
        </div>
    );
}
