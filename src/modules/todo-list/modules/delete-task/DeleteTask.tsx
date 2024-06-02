import Modal from "../../../../components/Modal";
import { Task } from "../../../../types/task";
import { upperFistChar } from "../../../../utils/string";
import { useDeleteTask } from "./hooks/useDeleteTask";

type Props = {
  task: Task;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const DeleteTask: React.FC<Props> = (props) => {
  const { task, showModal, setShowModal } = props;
  const { deleteTask } = useDeleteTask(task);

  return <Modal
    isShow={showModal}
    modalTitle="Delete Task"
    confirmText="Delete"
    cancelText="Cancel"
    show={() => setShowModal(true)}
    close={() => setShowModal(false)}
    confirm={deleteTask}
  >
    <div className="py-3">
      Are you sure want to delete this <b className="font-bold">"{upperFistChar(task.title)}"</b> task?
    </div>
  </Modal>;
};

export default DeleteTask;
