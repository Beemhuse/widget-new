// In fetcher, change URL to this when in dev mode
const isDev = import.meta.env.MODE === 'development';

const baseURL = isDev ? 'https://django-andromedia.onrender.com/' : 'https://your-api.com';

export const fetcher = async (endpoint, options = {}) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching data.');
    error.info = await res.json().catch(() => ({}));
    error.status = res.status;
    throw error;
  }

  return res.json();
};



// POST request
export const postData = async (endpoint, data = {}) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to post data');
  return res.json();
};

// PUT or PATCH request
export const updateData = async (endpoint, data = {}, method = 'PUT') => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update data');
  return res.json();
};