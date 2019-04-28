import apiService from "./apiService";

class taskService extends apiService {
  getTasks(data) {
    return this.get(`/tasks/${data.id}`);
  }

  createTask(data) {
    return this.put(`/tasks/${data.id}`, {
      title: data.title,
      message: data.message
    });
  }

  editTask(data) {
    const finalData = { ...data };
    delete finalData.id;
    return this.post(`/tasks/${data.id}`, finalData);
  }

  deleteTask(data) {
    return this.delete(`/tasks/${data.id}`);
  }
}

export default taskService;
