import axios from 'axios';

export default class HttpCall {
  constructor(apiUrl) {
    this.RESOURCE_NAME = apiUrl;
  }

  // getAll() {
  //   return axios.get(RESOURCE_NAME);
  // }

  get(id) {
    return axios.get(`${this.RESOURCE_NAME}/${id}`)
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  create(data) {
    return axios.post(this.RESOURCE_NAME, data, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
    )
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  update(id, data) {
    return axios.put(`${this.RESOURCE_NAME}/${id}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
      .then(response => response.data)
      .catch(error => `An error occured..${error}`);
  }

  delete(id) {
    return axios.delete(`${this.RESOURCE_NAME}/${id}`, {
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
