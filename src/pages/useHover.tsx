import { useState, useRef, useEffect, MutableRefObject } from 'react';

function useHover<T extends HTMLElement>(): [MutableRefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        console.log('run effect');
        const element = ref.current;
        if (!element) {
            return;
        }

        const handleMouseEnter = () => {
            setIsHover(true);
        };
        const handleMouseLeave = () => {
            setIsHover(false);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return [ref, isHover];
}

export default function App() {
    const [ref, isHover] = useHover<HTMLButtonElement>();
    return (
        <div>
            <button ref={ref}>+++++++++</button>
            <p>{isHover ? '悬浮中' : '没有悬浮'}</p>
        </div>
    );
}
