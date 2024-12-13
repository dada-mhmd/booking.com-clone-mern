const API_BASE_URL =import.meta.env.VITE_NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export const register = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const login = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error('Logout failed');
  }
};

export const validateToken = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error validating token");
    }
    return data;
}

export const addMyHotel = async formData => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!res.ok) {
        throw new Error('Error adding hotel');
    }
    const data = await res.json();
    return data;
}

export const getMyHotels = async ()  => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
            throw new Error(data.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}