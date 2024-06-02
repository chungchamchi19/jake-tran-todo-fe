import classNames from "classnames";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { DownIcon } from "../assets";

type Props = {
  list: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
}

const Select: React.FC<Props> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const getLabel = () => {
    return props.list.find((item) => item.value === props.value)?.label;
  };

  const toggle = () => {
    setIsShow(!isShow);
  };

  const onSetValue = (value: string) => {
    props.setValue(value);
    setIsShow(false);
  };

  useOnClickOutside(selectRef, () => {
    setIsShow(false);
  });

  return <div className="relative w-fit select-none py-2" ref={selectRef}>
    <div className="px-3 py-1 bg-gray-600 cursor-pointer rounded-md min-w-[100px] flex justify-between items-center gap-2" onClick={toggle}>
      <span>{getLabel()}</span>
      <DownIcon></DownIcon>
    </div>
    <div className={classNames({ "hidden": !isShow }, "absolute left-0 top-full rounded-md overflow-auto w-full z-10")}>
      {props.list.map((item) => {
        return <div
          key={item.value}
          className={classNames({ "cursor-pointer": props.value !== item.value }, "p-2 bg-gray-600 hover:bg-gray-500")}
          onClick={() => { onSetValue(item.value); }}
        >
          <span className="text-sm">{item.label}</span>
        </div>;
      })}
    </div>
  </div>;
};

export default Select;
