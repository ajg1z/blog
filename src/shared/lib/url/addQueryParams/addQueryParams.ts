export const getQueryParams = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([name, value]) => {
        if (value) {
            searchParams.set(name, value);
        } else searchParams.set(name, '');
    });

    return searchParams.toString();
};

export const addQueryParams = (params: Record<string, string | undefined>) => {
    const query = getQueryParams(params);

    window.history.pushState(null, '', `?${query}`);
};
