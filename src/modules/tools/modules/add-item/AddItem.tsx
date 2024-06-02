import { useState } from "react";
import { useAddItem } from "./hooks/useAddItem";
import Modal from "../../../../components/Modal";
import TaskForm from "../../../../components/TaskForm";
import { PlusIcon } from "../../../../assets";

const AddItem: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    isInvalidTitle,
    handleChangeTitle,
    handleChangeDesc,
    addTask,
    title,
    desc,
    status,
    setStatus,
    dueDate,
    setDueDate
  } = useAddItem();

  const handleShowModal = () => {
    setShowModal(true);
  };

  return <div>
    <button className="flex items-center gap-1 rounded bg-pink-400 text-white py-1 px-2 hover:bg-pink-300" onClick={handleShowModal}>
      <PlusIcon></PlusIcon>
      <span className="text-md">Add Task</span>
    </button>
    <Modal
      modalTitle="Create Task"
      confirmText="Create"
      cancelText="Cancel"
      isShow={showModal}
      show={() => setShowModal(true)}
      close={() => setShowModal(false)}
      confirm={addTask}
      disableConfirm={isInvalidTitle}
    >
      <TaskForm
        title={title}
        desc={desc}
        status={status}
        isInvalidTitle={isInvalidTitle}
        handleChangeTitle={handleChangeTitle}
        handleChangeDesc={handleChangeDesc}
        setStatus={setStatus}
        dueDate={dueDate}
        setDueDate={setDueDate}
      ></TaskForm>
    </Modal>
  </div>;
};

export default AddItem;
