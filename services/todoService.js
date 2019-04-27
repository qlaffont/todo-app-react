import apiService from "./apiService";

class todoService extends apiService {
  createNewTodo(data) {
    return this.put("/todos", {
      title: data.title
    });
  }

  getTodo(data) {
    return this.get(`/todos/${data.id}`);
  }

  editTodo(data) {
    return this.post(`/todos/${data.id}`, {
      title: data.title
    });
  }

  deleteTodo(data) {
    return this.delete(`/todos/${data.id}`);
  }
}

export default todoService;
