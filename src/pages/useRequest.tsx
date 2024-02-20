import Mock from 'mockjs';
import { useEffect, useState } from 'react';

function useRequest<D>(requestFn: () => Promise<D>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown | undefined>();
    const [data, setData] = useState<D | undefined>();

    useEffect(() => {
        (async function () {
            try {
                setData(await requestFn());
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
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
