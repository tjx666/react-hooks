import { useCallback, useState } from 'react';

function useUpdate() {
    const [, setState] = useState({});

    return useCallback(() => {
        setState({});
    }, []);
}

export default function Page() {
    const update = useUpdate();

    return (
        <>
            <div>Time: {Date.now()}</div>
            <button type="button" onClick={update} style={{ marginTop: 8 }}>
                update
            </button>
        </>
    );
}
