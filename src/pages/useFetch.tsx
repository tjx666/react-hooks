import { useEffect, useState } from 'react';

interface FetchState<D> {
    data: D | undefined;
    loading: boolean;
    error: unknown | undefined;
}

function useFetch<D = unknown>(url: string): FetchState<D> {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown | undefined>();
    const [data, setData] = useState<D | undefined>();

    useEffect(() => {
        let isUnmounted = false;
        (async function () {
            try {
                const resp = await fetch(url);
                if (isUnmounted) return;

                if (Math.trunc(resp.status / 100) !== 2) {
                    setError(new Error(`${resp.status} ${resp.statusText}`));
                } else {
                    setData(await resp.json());
                    if (isUnmounted) return;
                }
            } catch (error) {
                if (!isUnmounted) {
                    setError(error);
                }
            }
            setLoading(false);
        })();

        return () => {
            isUnmounted = true;
        };
    }, [url]);

    return {
        loading,
        error,
        data,
    };
}

export default function Page() {
    const { loading, error, data } = useFetch<number[]>(
        'https://hacker-news.firebaseio.com/v0/jobstories.json',
    );

    if (error) {
        return <div>failed to load</div>;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <>
            <h2>response body:</h2>
            <output>{JSON.stringify(data, null, 4)}</output>
        </>
    );
}
