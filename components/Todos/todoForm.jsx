import React, { useState } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n";

const TodoForm = ({ data, t, onSubmit }) => {
  let defaultTitle = "";

  if (data) {
    if (data.title) {
      defaultTitle = data.title;
    }
  }

  const [title, setTitle] = useState(defaultTitle);

  const submitForm = evt => {
    evt.preventDefault();
    onSubmit({ title });
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

TodoForm.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

TodoForm.defaultProps = {
  data: {
    title: ""
  }
};

TodoForm.getInitialProps = () => {
  return {
    namespacesRequired: ["common"]
  };
};

export default withTranslation("common")(TodoForm);
