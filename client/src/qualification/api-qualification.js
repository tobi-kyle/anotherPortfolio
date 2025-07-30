const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/qualifications";

export const create = async (qualification, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(qualification)
    });
    return await response.json();
  } catch (err) {
    console.error("API Create Qualification Error:", err);
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
    console.error("API List Qualification Error:", err);
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
    console.error("API Get Qualification Error:", err);
    throw err;
  }
};

export const update = async (id, qualification, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(qualification)
    });
    return await response.json();
  } catch (err) {
    console.error("API Update Qualification Error:", err);
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
    console.error("API Delete Qualification Error:", err);
    throw err;
  }
};
