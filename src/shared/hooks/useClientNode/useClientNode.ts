import { useState, useCallback } from 'react';

export function useClientNode<T>(): [T | null, (node: T) => T] {
    const [ref, setRef] = useState<T | null>(null);

    const getRef = useCallback((node: T) => {
        if (node !== null) {
            setRef(node);
        }
        return node;
    }, []);

    return [ref, getRef];
}
