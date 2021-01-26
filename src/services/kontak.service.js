import http from "../http-common";

class KontakDataService {
  getAll() {
    return http.get('?results=5&exc=login,registered,id,nat&nat=us&noinfo');
  }

  get(id) {
    return http.get(`/?/${id}`);
  }

  create(data) {
    return http.post("/?", data);
  }

  update(id, data) {
    return http.put(`/?/${id}`, data);
  }

  delete(id) {
    return http.delete(`/?/${id}`);
  }

  deleteAll() {
    return http.delete(`/?`);
  }
}

export default new KontakDataService();