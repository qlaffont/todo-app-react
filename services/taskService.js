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
    return this.post(`/tasks/${data.id}`, {
      title: data.title,
      message: data.message,
      completed: data.completed,
      priority: data.priority
    });
  }

  deleteTask(data) {
    return this.delete(`/tasks/${data.id}`);
  }
}

export default taskService;
