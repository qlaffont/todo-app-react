import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useAlert } from "react-alert";

import TodoService from "../services/todoService";
import Layout from "../components/Layout/Layout";

import { Router, withTranslation } from "../i18n";

const todoService = new TodoService();

const Index = ({ t }) => {
  const alert = useAlert();

  const createTodo = () => {
    todoService
      .createNewTodo({
        title: t("defaultNameTodo")
      })
      .then(res => {
        alert.success(t("UserRedirected"));
        setTimeout(() => Router.push(`/todos/${res.data.id}`), 3000);
      })
      .catch(() => {
        alert.error(t("ServerError"));
      });
  };

  return (
    <Layout>
      <Head>
        <title>{t("Index.titleHtml")}</title>
      </Head>
      <div className="centerall">
        <div className="home has-text-centered">
          <h1 className="title is-3">{t("Index.title")}</h1>
          <p>{t("Index.description")}</p>
          <br />

          <button className="button is-info" type="submit" onClick={() => createTodo()}>
            <i className="fas fa-tasks" />
            &nbsp;
            {t("Index.createTodo")}
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

export default withTranslation("common")(Index);
