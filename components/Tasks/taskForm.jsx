import React, { useState } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n";

const TaskForm = ({ data, t, onSubmit }) => {
  let defaultTitle = "";
  let defaultMessage = "";

  if (data) {
    if (data.title) {
      defaultTitle = data.title;
    }

    if (data.message) {
      defaultMessage = data.message;
    }
  }

  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState(defaultMessage);

  const submitForm = evt => {
    evt.preventDefault();
    onSubmit({ title, message });
  };

  return (
    <div>
      <form onSubmit={evt => submitForm(evt)} id="addFormTodo">
        <div className="field">
          <label className="label" htmlFor="title">
            {t("Input.title")}
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              id="title"
              minLength="5"
              required
              value={title}
              onChange={evt => setTitle(evt.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="message">
            {t("Input.message")}
          </label>
          <div className="control">
            <textarea
              className="input"
              type="text"
              id="message"
              minLength="5"
              value={message}
              onChange={evt => setMessage(evt.target.value)}
            />
          </div>
          <i>
            {t("Input.markdownHelp")}
            <a
              href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Input.yesHelp")}
            </a>
          </i>
        </div>
        <div className="has-text-centered">
          <button type="submit" className="button is-success">
            {t("Input.send")}
          </button>
        </div>
      </form>
      <style jsx>
        {`
          textarea {
            min-height: 100px;
          }
        `}
      </style>
    </div>
  );
};

TaskForm.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
};

TaskForm.defaultProps = {
  data: {
    title: "",
    message: ""
  }
};

TaskForm.getInitialProps = () => {
  return {
    namespacesRequired: ["common"]
  };
};

export default withTranslation("common")(TaskForm);
