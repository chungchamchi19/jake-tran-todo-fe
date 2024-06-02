import { CloseIcon } from "../assets";

type Props = {
  modalTitle: string;
  confirmText: string;
  cancelText: string;
  isShow: boolean;
  show?: () => void;
  close?: () => void;
  confirm?: () => void;
  children?: React.ReactNode;
  disableConfirm?: boolean;
}

const Modal: React.FC<Props> = (props) => {
  const onConfirm = () => {
    props.confirm && props.confirm();
    if (!props.disableConfirm) {
      props.close && props.close();
    }
  };

  return props.isShow && <div className="fixed top-0 left-0 w-screen h-screen z-10 flex items-start justify-center">
    <div className="absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-90" onClick={props.close}>
    </div>
    <div className="w-[800px] bg-gray-700 rounded-lg relative z-10 top-16">
      <div className="border-b border-gray-600">
        <div className="py-3 px-5 flex justify-between items-center">
          <h2 className="font-bold">
            {props.modalTitle}
          </h2>
          <div className="cursor-pointer h-6 w-6 rounded-sm hover:bg-gray-600 flex items-center justify-center" onClick={props.close}>
            <CloseIcon></CloseIcon>
          </div>
        </div>
      </div>
      <div className="py-4 px-5">
        {props.children}
      </div>
      <div className="border-t border-gray-600">
        <div className="py-3 px-5 flex justify-end gap-2">
          <button className="rounded bg-gray-400 text-white py-1 px-4 hover:bg-gray-300" onClick={props.close}>
            {props.cancelText}
          </button>
          <button className="rounded bg-pink-400 text-white py-1 px-4 hover:bg-pink-300" onClick={onConfirm}>
            {props.confirmText}
          </button>
        </div>
      </div>
    </div>
  </div>;
};

export default Modal;
