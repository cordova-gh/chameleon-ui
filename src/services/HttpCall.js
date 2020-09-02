import axios from 'axios';

export default class HttpCall {
  baseUrl = 'https://chameleon-be.herokuapp.com';
  constructor(apiUrl) {
    this.RESOURCE_NAME = apiUrl;
  }

  get(params) {
    return axios
      .get(`${this.baseUrl + this.RESOURCE_NAME + params}`)
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  getById(id) {
    return axios
      .get(`${this.baseUrl + this.RESOURCE_NAME}/${id}`)
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  create(data) {
    return axios
      .post(`${this.baseUrl + this.RESOURCE_NAME}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  update(id, data) {
    return axios
      .put(`${this.baseUrl + this.RESOURCE_NAME}/${id}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  delete(id) {
    return axios
      .delete(`${this.baseUrl + this.RESOURCE_NAME}/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  // sendFile(data, apiUrl) {
  //   return axios.post(`${RESOURCE_NAME}/${apiUrl}`,
  //     data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     },
  //   );
  // }
}
