const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/projects";

export const create = async (project, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  } catch (err) {
    console.error("API Create Project Error:", err);
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
    console.error("API List Project Error:", err);
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
    console.error("API Get Project Error:", err);
    throw err;
  }
};

export const update = async (id, project, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  } catch (err) {
    console.error("API Update Project Error:", err);
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
    console.error("API Delete Project Error:", err);
    throw err;
  }
};
