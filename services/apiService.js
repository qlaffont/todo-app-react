import axios from "axios";

class apiService {
  constructor() {
    this.axios = axios;
    this.base = process.env.BASE;
  }

  get(url, data = {}) {
    return this.request("get", url, data);
  }

  post(url, data = {}) {
    return this.request("post", url, data);
  }

  put(url, data = {}) {
    return this.request("put", url, data);
  }

  delete(url, data = {}) {
    return this.request("delete", url, data);
  }

  request(method, url, data) {
    const axiosOptions = {
      method,
      url: this.base + url,
      headers: {}
    };

    if (Object.keys(data).length > 0) {
      axiosOptions.data = data;
    }

    return new Promise((resolve, reject) => {
      this.axios(axiosOptions)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default apiService;
