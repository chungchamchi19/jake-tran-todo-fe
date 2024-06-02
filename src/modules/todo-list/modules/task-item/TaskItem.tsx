import dayjs from "dayjs";
import { TrashIcon } from "../../../../assets";
import { listStatus, statusColorCSS } from "../../../../configs/status";
import { StatusEnum, Task } from "../../../../types/task";
import { upperFistChar } from "../../../../utils/string";
import classNames from "classnames";
import StatusSelect from "../../../../components/StatusSelect";

type Props = {
  task: Task;
  onEditing: (task: Task) => void;
  onDeleting: (task: Task) => void;
  onChangeStatus: (task: Task, status: StatusEnum) => void;
}

const TaskItem: React.FC<Props> = (props) => {
  const { task, onEditing, onDeleting, onChangeStatus } = props;

  const handleEditing = () => {
    onEditing(task);
  };

  const handleDeleting = () => {
    onDeleting(task);
  };

  return <div className="flex justify-between py-2 border-b border-gray-600 gap-2 items-center">
    <div className="flex items-center gap-2 w-[calc(100%-200px)] cursor-pointer" onClick={handleEditing}>
      <StatusSelect
        list={listStatus}
        value={props.task.status}
        setValue={(status) => {
          if (status === props.task.status) return;
          onChangeStatus(props.task, status as StatusEnum);
        }}
      >
        <div
          className={`w-4 h-4 flex-none rounded-full ${statusColorCSS[props.task.status]}`}
        >
        </div>
      </StatusSelect>
      <span className="truncate" title={upperFistChar(props.task.title)}>{upperFistChar(props.task.title)}</span>
    </div>
    {
      props.task.dueDate && (
        <div className="w-fit text-xs cursor-pointer" onClick={handleEditing}>
          <span className={classNames({ "text-red-300": dayjs(props.task.dueDate).isBefore(new Date()) })}>
            Due date: {dayjs(props.task.dueDate).format("MM-DD-YYYY")}
          </span>
        </div>
      )
    }
    <div className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-sm hover:bg-gray-500" onClick={handleDeleting}>
      <TrashIcon></TrashIcon>
    </div>
  </div >;
};

export default TaskItem;
