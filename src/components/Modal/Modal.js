import React from "react";
import { Modal as AModal } from "antd";
function Modal(props) {
  const { children, title, isVisible, setIsVisible } = props;
  return (
    <AModal
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      onOk={() => setIsVisible(false)}
    >
      {children}
    </AModal>
  );
}

export default Modal;
