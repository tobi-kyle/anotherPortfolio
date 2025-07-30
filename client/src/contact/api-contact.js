const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/contacts";

// CREATE with avatar support
export const create = async (contact, token) => {
  try {
    const formData = new FormData();
    for (let key in contact) {
      if (contact[key]) formData.append(key, contact[key]);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formData
    });

    return await response.json();
  } catch (err) {
    console.error("API Create Contact Error:", err);
    throw err;
  }
};

// LIST
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

// GET BY ID
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

// UPDATE with avatar support
export const update = async (id, contact, token) => {
  try {
    const formData = new FormData();
    for (let key in contact) {
      if (contact[key]) formData.append(key, contact[key]);
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token
      },
      body: formData
    });

    return await response.json();
  } catch (err) {
    console.error("API Update Contact Error:", err);
    throw err;
  }
};

// DELETE
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
