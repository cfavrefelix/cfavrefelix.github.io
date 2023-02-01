
const MEMOIZED_VALUES = new Map<string, any>();

async function memoizedRequest<T = any>(url: string, init?: RequestInit): Promise<T> {

    if (MEMOIZED_VALUES.has(url)) {
        return MEMOIZED_VALUES.get(url) as T;
    }

    const resp = await fetch(url, init);
    const data = await resp.json();

    MEMOIZED_VALUES.set(url, data);

    return data as T;
};

export default memoizedRequest;