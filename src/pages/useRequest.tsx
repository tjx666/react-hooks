import Mock from 'mockjs';
import { useEffect, useState } from 'react';

function useRequest<D>(requestFn: () => Promise<D>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown | undefined>();
    const [data, setData] = useState<D | undefined>();

    useEffect(() => {
        let isUnmounted = false;

        (async function () {
            try {
                const _data = await requestFn();
                setData(_data);
            } catch (error) {
                if (isUnmounted) return;
                setError(error);
            }

            if (isUnmounted) return;
            setLoading(false);
        })();

        return () => {
            isUnmounted = true;
        };
    }, [requestFn]);

    return {
        loading,
        error,
        data,
    };
}

function getUsername(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Mock.mock('@name'));
        }, 1000);
    });
}

export default function Page() {
    const { data, error, loading } = useRequest(getUsername);

    if (error) {
        return <div>failed to load</div>;
    }
    if (loading) {
        return <div>loading...</div>;
    }
    return <div>Username: {data}</div>;
}
