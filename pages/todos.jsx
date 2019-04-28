/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useAlert } from "react-alert";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  Delete
} from "bloomer";

import TodoService from "../services/todoService";
import TaskService from "../services/taskService";
import { withNamespaces, Router } from "../i18n";

import Footer from "../components/Layout/Footer";
import TaskForm from "../components/Tasks/taskForm";
import TodoForm from "../components/Todos/todoForm";
import Task from "../components/Tasks/task";

import "../assets/css/main.css";

const todoService = new TodoService();
const taskService = new TaskService();

// TODO: Optimise Reload if have time
// TODO: Integrate Message + Error Code in API

const Todos = ({ todo, tasks, t }) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (todo.id === "" || !todo.id) {
    Router.push("/");
    return false;
  }

  // Use React Hooks
  const [modalEdit, setModalEdit] = useState(0);
  const [modalTask, setModalTask] = useState(0);
  const [modalDelete, setModalDelete] = useState(0);

  const alert = useAlert();
  const { title } = todo;

  const createTask = data => {
    taskService
      .createTask({
        id: todo.id,
        title: data.title,
        message: data.message
      })
      .then(res => {
        alert.success(res.data.message);
        window.location.reload();
      })
      .catch(err => {
        alert.error(err.response.data.error || t("ServerError"));
      });
  };

  const editTask = data => {
    taskService
      .editTask(data)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        alert.error(err.response.data.error || t("ServerError"));
      });
  };

  const deleteTask = data => {
    taskService
      .deleteTask(data)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        alert.error(err.response.data.error || t("ServerError"));
      });
  };

  const editTodo = data => {
    todoService
      .editTodo({ ...data, id: todo.id })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        alert.error(err.response.data.error || t("ServerError"));
      });
  };

  const deleteTodo = () => {
    todoService
      .deleteTodo({
        id: todo.id
      })
      .then(() => {
        Router.push("/");
      })
      .catch(err => {
        alert.error(err.response.data.error || t("ServerError"));
      });
  };

  return (
    <div>
      <Head>
        <title>{`${title} - Totask`}</title>
      </Head>
      <div className="centerall">
        <div className="todos">
          <h1 className="title is-3">{title}</h1>
          <br />
          {tasks.map(task => {
            return (
              <Task
                data={task}
                key={task._id}
                onEdit={data => editTask(data)}
                onDelete={data => deleteTask(data)}
              />
            );
          })}
          <hr />
          <div className="tools">
            <div className="tools-item">
              <button
                className="button is-primary"
                type="button"
                onClick={() => setModalTask(true)}
              >
                <i className="fas fa-tasks" />
                &nbsp;
                {t("Actions.addTask")}
              </button>
            </div>

            <div className="tools-item">
              <button className="button is-info" type="button" onClick={() => setModalEdit(true)}>
                <i className="fas fa-cog" />
                &nbsp;
                {t("Actions.editTodo")}
              </button>
            </div>

            <div className="tools-item">
              <button
                className="button is-danger"
                type="button"
                onClick={() => setModalDelete(true)}
              >
                <i className="fas fa-trash" />
                &nbsp;
                {t("Actions.deleteTodo")}
              </button>
            </div>
          </div>
          <hr />
          <Footer />
        </div>
      </div>
      <Modal isActive={modalTask}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{t("Actions.addTask")}</ModalCardTitle>
            <Delete onClick={() => setModalTask(false)} />
          </ModalCardHeader>
          <ModalCardBody>
            <TaskForm onSubmit={d => createTask(d)} />
          </ModalCardBody>
        </ModalCard>
      </Modal>
      <Modal isActive={modalDelete}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{t("Actions.deleteTodo")}</ModalCardTitle>
            <Delete onClick={() => setModalDelete(false)} />
          </ModalCardHeader>
          <ModalCardBody>{t("Actions.deleteTodoConfirmation")}</ModalCardBody>
          <ModalCardFooter>
            <button className="button is-danger" type="button" onClick={() => deleteTodo()}>
              Yes
            </button>
            <button className="button" type="button" onClick={() => setModalDelete(false)}>
              No
            </button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
      <Modal isActive={modalEdit}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>{t("Actions.editTodo")}</ModalCardTitle>
            <Delete onClick={() => setModalEdit(false)} />
          </ModalCardHeader>
          <ModalCardBody>
            <TodoForm data={todo} onSubmit={d => editTodo(d)} />
          </ModalCardBody>
        </ModalCard>
      </Modal>
    </div>
  );
};

Todos.getInitialProps = async context => {
  let res;
  let resTasks = [];
  try {
    res = await todoService.getTodo({
      id: context.query.id
    });

    resTasks = await taskService.getTasks({
      // eslint-disable-next-line no-underscore-dangle
      id: res.data._id
    });
  } catch (e) {
    if (!res) {
      Router.push("/");
      res = {};
      res.data = {};
    }
  }

  return {
    namespacesRequired: ["common", "footer"],
    todo: res.data,
    tasks: resTasks.data || []
  };
};

Todos.propTypes = {
  t: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  )
};

export default withNamespaces("common")(Todos);
