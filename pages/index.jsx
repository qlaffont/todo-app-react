import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useAlert } from "react-alert";

import TodoService from "../services/todoService";
import Layout from "../components/Layout/Layout";

import { Router, withNamespaces } from "../i18n";

const todoService = new TodoService();

const createTodo = alert => {
  todoService
    .createNewTodo({
      title: "todo Test"
    })
    .then(res => {
      alert.success("You will be redirected asap ! ");
      setTimeout(() => Router.push(`/todos/${res.data.id}`), 3000);
    })
    .catch(res => {
      alert.error("Bug on our system, can you retry please ?");
    });
};

const Index = props => {
  const alert = useAlert();
  return (
    <Layout>
      <Head>
        <title>Home - Totask</title>
      </Head>
      <div className="centerall">
        <div className="home has-text-centered">
          <h1 className="title is-3">Welcome to Totask ! </h1>
          <p>The best todo web app.</p>
          <br />

          <button className="button" type="submit" onClick={() => createTodo(alert)}>
            Create a todo
          </button>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = () => {
  return {
    namespacesRequired: ["common", "footer"]
  };
};

Index.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces("common")(Index);
