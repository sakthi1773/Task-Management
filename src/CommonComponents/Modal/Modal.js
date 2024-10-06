import { Modal as ADModal } from "antd";

const Modal = ({
  open,
  onClose,
  onOk,
  onCancel,
  children,
  cancelText,
  okText,
  title,
  footer
}) => {
  return (
    <ADModal
      title={title}
      open={open}
      onClose={onClose}
      onOk={onOk}
      onCancel={onCancel}
      cancelText={cancelText}
      okText={okText}
      footer={footer}
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </ADModal>
  );
};

export default Modal;
