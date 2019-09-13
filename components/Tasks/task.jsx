import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Collapsible from "react-collapsible";
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  Delete
} from "bloomer";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n";

import TaskForm from "./taskForm";

const Task = ({ data, t, onEdit, onDelete }) => {
  const { _id, priority, completed, title, message, creationDate } = data;

  const [modal, setModal] = useState(0);
  const [prioritySelect, setPriority] = useState(priority);

  let className = "task";

  if (priority) {
    className = `${className} priority-${priority}`;
  }

  if (completed) {
    className = `${className} completed`;
  }

  const changePriority = evt => {
    setPriority(evt.target.value);
    onEdit({
      priority: evt.target.value,
      id: _id
    });
  };

  const editCompleted = () => {
    onEdit({
      completed: !completed,
      id: _id
    });
  };

  const editForm = d => {
    onEdit({
      ...d,
      id: _id
    });
    setModal(false);
  };

  const deleteTask = () => {
    onDelete({
      id: _id
    });
  };
  return (
    <div className={className}>
      <Collapsible trigger={title}>
        <ReactMarkdown source={message} />
        <div>
          <hr />
          <span>{`${t("Task.created")} : `}</span>
          {new Date(creationDate).toLocaleString()}
        </div>
        <div>
          <hr />
          <div className="tools">
            <div className="tools-item">
              {completed === true ? (
                <button
                  className="button is-small far fa-square is-info"
                  onClick={() => editCompleted()}
                  type="button"
                />
              ) : (
                <button
                  className="button is-small far fa-check-square is-info"
                  onClick={() => editCompleted()}
                  type="button"
                />
              )}
            </div>
            <div className="tools-item">
              <button
                className="button is-small far fa-edit is-primary"
                onClick={() => setModal(1)}
                type="button"
              />
            </div>
            <div className="tools-item">
              <button
                className="button is-small is-danger far fa-trash-alt"
                type="button"
                onClick={() => deleteTask()}
              />
            </div>

            <select name="" id="" value={prioritySelect} onChange={evt => changePriority(evt)}>
              <option value="0">{t("Task.Select.noPriority")}</option>
              <option value="1">{t("Task.Select.lowPriority")}</option>
              <option value="2">{t("Task.Select.middlePriority")}</option>
              <option value="3">{t("Task.Select.highPriority")}</option>
            </select>
          </div>
        </div>
        <Modal isActive={modal}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              <ModalCardTitle>{t("Actions.editTask")}</ModalCardTitle>
              <Delete onClick={() => setModal(false)} />
            </ModalCardHeader>
            <ModalCardBody>
              <TaskForm data={data} onSubmit={d => editForm(d)} />
            </ModalCardBody>
          </ModalCard>
        </Modal>
      </Collapsible>
    </div>
  );
};

Task.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    message: PropTypes.string,
    creationDate: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

Task.getInitialProps = () => {
  return {
    namespacesRequired: ["common"]
  };
};

export default withTranslation("common")(Task);
