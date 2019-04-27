import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useAlert } from "react-alert";

import TodoService from "../services/todoService";
import TaskService from "../services/taskService";
import Layout from "../components/Layout/Layout";

import { withNamespaces } from "../i18n";

const todoService = new TodoService();
const taskService = new TaskService();

const Todos = props => {
  // eslint-disable-next-line react/destructuring-assignment
  if (!props.todo.title) {
    return <div>Not Found</div>;
  }

  const alert = useAlert();
  const { todo, tasks } = props;
  const { title } = todo;
  return (
    <Layout>
      <Head>
        <title>{`${title} - Totask`}</title>
      </Head>
      <div className="centerall">
        <div className="todos">
          <h1 className="title is-3">{title}</h1>
          <br />
          <p>azezaeaze zaeazeaze azeaze aze az eae az eaz za</p>
        </div>
      </div>
    </Layout>
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
      id: res.data.id
    });
  } catch (e) {
    if (!res) {
      res = {};
      res.data = {};
    }
  }

  return {
    namespacesRequired: ["todos", "footer"],
    todo: res.data,
    tasks: resTasks.data || []
  };
};

Todos.propTypes = {
  t: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  )
};

export default withNamespaces("todos")(Todos);
