const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/contacts";

export const create = async (contact, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(contact)
    });
    return await response.json();
  } catch (err) {
    console.error("API Create Contact Error:", err);
    throw err;
  }
};

export const list = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    return await response.json();
  } catch (err) {
    console.error("API List Contact Error:", err);
    throw err;
  }
};

export const getById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    return await response.json();
  } catch (err) {
    console.error("API Get Contact Error:", err);
    throw err;
  }
};

export const update = async (id, contact, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(contact)
    });
    return await response.json();
  } catch (err) {
    console.error("API Update Contact Error:", err);
    throw err;
  }
};

export const remove = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    });
    return await response.json();
  } catch (err) {
    console.error("API Delete Contact Error:", err);
    throw err;
  }
};
