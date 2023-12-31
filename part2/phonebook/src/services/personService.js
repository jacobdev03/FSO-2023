import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((res) => res.data);
};

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then((res) => res.data);
};

const deleteOne = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => console.log(res));
};

export default { getAll, create, update, deleteOne };
