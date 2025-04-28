const BASE_URL = 'https://backend-453n.onrender.com'; // production URL
// const BASE_URL = 'http://localhost:5000'; // localhost for development

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const response = await fetch(BASE_URL + url, config);

  if (response.status !== 401) return response;

  // Token expired, try refreshing
  try {
    const refreshRes = await fetch(BASE_URL + '/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (!refreshRes.ok) throw new Error('Refresh token failed');

    const data = await refreshRes.json();
    const newAccessToken = data.token;

    localStorage.setItem('token', newAccessToken);

    // Retry original request with new token
    const retryConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
      credentials: 'include', // important !!
    };

    return await fetch(BASE_URL + url, retryConfig);
  } catch (err) {
    console.error('Session expired. Please log in again.');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '#/login';
    throw err;
  }
};