/* eslint-disable class-methods-use-this */
import axios from 'axios';
import store from '../store';

export default class HttpCall {
  baseUrl = 'https://chameleon-be.herokuapp.com';
  // baseUrl = 'http://localhost:5000';
  constructor(apiUrl) {
    this.RESOURCE_NAME = apiUrl;
  }

  get(params = '') {
    // this.$store.commit('showSpinnerState');
    store.commit('showSpinner');
    return axios
      .get(`${this.baseUrl + this.RESOURCE_NAME + params}`)
      .then((response) => {
        store.commit('hiddenSpinner');
        return response.data;
      })
      .catch(error => `An error occured..${error}`);
  }

  getById(id) {
    store.commit('showSpinner');
    return axios
      .get(`${this.baseUrl + this.RESOURCE_NAME}/${id}`)
      .then((response) => {
        store.commit('hiddenSpinner');
        return response.data;
      })
      .catch(error => `An error occured..${error}`);
  }

  create(data) {
    store.commit('showSpinner');
    return axios
      .post(`${this.baseUrl + this.RESOURCE_NAME}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        store.commit('hiddenSpinner');
        return response.data;
      })
      .catch(error => `An error occured..${error}`);
  }

  update(id, data) {
    store.commit('showSpinner');
    return axios
      .put(`${this.baseUrl + this.RESOURCE_NAME}/${id}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        store.commit('hiddenSpinner');
        return response.data;
      })
      .catch(error => `An error occured..${error}`);
  }

  delete(id) {
    store.commit('showSpinner');
    return axios
      .delete(`${this.baseUrl + this.RESOURCE_NAME}/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        store.commit('hiddenSpinner');
        return response.data;
      })
      .catch(error => `An error occured..${error}`);
  }

  sendFile(apiUrl, data) {
    // eslint-disable-next-line no-console
    console.log('CIAOAOAO');
    return axios.post(`${this.baseUrl + this.RESOURCE_NAME + apiUrl}`,
      data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
}
