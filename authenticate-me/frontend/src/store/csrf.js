const csrfFetch = async (url, options = {}) => {
    options.headers ||= {}
    options.method ||= 'GET'
    if (options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 'application/json'
        const token = sessionStorage.getItem('X-CSRF-Token')
        options.headers['X-CSRF-Token'] = token
    }
    const response = await fetch(url, options);
    if (response.status >= 400) {
        throw response;
    } else {
        return response;
    }
}

export default csrfFetch;

export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get('X-CSRF-Token')
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

export const restoreCSRF = async () => {
    const response = await csrfFetch('/api/session')
    storeCSRFToken(response);
    return response;
}