import { useEffect, useState } from "react";
import { listStatus } from "../configs/status";
import { StatusEnum } from "../types/task";
import Select from "./Select";
import DatePicker from "react-datepicker";

type Props = {
  title: string;
  desc: string;
  status: StatusEnum;
  dueDate: string | null;
  isInvalidTitle: boolean;
  handleChangeTitle: (value: string) => void;
  handleChangeDesc: (value: string) => void;
  setStatus: (value: StatusEnum) => void;
  setDueDate: (value: string) => void;
}

const TaskForm: React.FC<Props> = (props) => {
  const {
    title,
    desc,
    status,
    dueDate,
    isInvalidTitle,
    handleChangeTitle,
    handleChangeDesc,
    setStatus,
    setDueDate
  } = props;
  const [isTypedTitle, setIsTypedTitle] = useState<boolean>(false);
  const [isShowDueDate, setIsShowDueDate] = useState<boolean>(false);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChangeTitle(value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleChangeDesc(value);
  };

  const changeShowDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsShowDueDate(checked);
    if (checked && !dueDate) {
      setDueDate(new Date().toDateString());
      return;
    }
    if (!checked) {
      setDueDate("");
    }
  };

  useEffect(() => {
    if (title && !isTypedTitle) {
      setIsTypedTitle(true);
    }
  }, [title, isTypedTitle]);

  useEffect(() => {
    setIsShowDueDate(!!dueDate);
  }, [dueDate]);

  return (
    <div>
      <label className="block mb-2">Title</label>
      <input
        type="text"
        id="create_title"
        className="w-full p-2 rounded-md bg-transparent focus-visible:!outline-none border border-gray-600 mb-2 text-sm"
        placeholder="Task name"
        autoComplete="off"
        onChange={onChangeTitle}
        value={title}
      />
      {isInvalidTitle && isTypedTitle && <div className="text-red-500 mt-1 mb-2 text-sm">Title is required</div>}
      <label className="block mb-2">Description</label>
      <div className="flex">
        <textarea
          rows={5}
          className="w-full p-2 rounded-md bg-transparent focus-visible:!outline-none border border-gray-600 mb-2 text-sm resize-none"
          placeholder="Write something for description"
          onChange={onChangeDescription}
          value={desc}
        ></textarea>
      </div>
      <label>Status</label>
      <div className="text-sm">
        <Select
          list={listStatus}
          value={status}
          setValue={(value) => setStatus(value as StatusEnum)}
        ></Select>
      </div>
      <div className="flex gap-2 mb-2">
        <input type="checkbox" checked={isShowDueDate} onChange={changeShowDueDate} />
        Due date
      </div>
      {
        isShowDueDate && (
          <div>
            <DatePicker selected={dueDate ? new Date(dueDate) : new Date()} onChange={(date) => {
              if (date) {
                setDueDate(date.toDateString());
              }
            }} />
          </div>
        )
      }
    </div>
  );
};

export default TaskForm;
