import classNames from "classnames";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  list: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
  children: React.ReactNode;
}

const StatusSelect: React.FC<Props> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
    <div onClick={toggle}>
      {props.children}
    </div>
    <div className={classNames({ "hidden": !isShow }, "absolute left-0 top-full rounded-md overflow-auto w-auto z-10")}>
      {props.list.map((item) => {
        return <div
          key={item.value}
          className={classNames({ "cursor-pointer": props.value !== item.value }, "p-2 bg-gray-600 hover:bg-gray-500")}
          onClick={(e) => { e.stopPropagation(); onSetValue(item.value); }}
        >
          <span className="text-sm">{item.label}</span>
        </div>;
      })}
    </div>
  </div>;
};

export default StatusSelect;
