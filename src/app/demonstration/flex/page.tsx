"use client";

import { generateRandomKey } from "@/components/org-modes/LineContentComponents";
import { ReactNode, useState } from "react";

export default function FlexDemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModalWithMessage = (message: string) => {
    setModalMessage(message);
    setIsOpen(true);
  };

  let message1 =
    "justify-content: center;\nalign-items: baseline;\nalign-content: end;";

  return (
    <>
      <div className="flex w-1/2 h-80 bg-gray-700 justify-start">
        <div
          key={generateRandomKey("test")}
          className="flex justify-center content-center h-20 w-20 bg-red-600 m-4 text-3xl"
          onMouseOver={() => {
            setIsOpen(true);
            setModalMessage(message1);
          }}
        >
          <h3>1</h3>
        </div>
        <div
          key={generateRandomKey("test")}
          className="flex h-20 w-20 bg-red-600 m-4 justify-center"
        >
          2
        </div>
        <div
          key={generateRandomKey("test")}
          className="flex h-20 w-20 bg-red-600 m-4 text-cente flex-grow"
          style={{
            flexShrink: 0,
          }}
        >
          3
        </div>
        <div
          key={generateRandomKey("test")}
          className="flex h-20 w-20 bg-red-600 m-4 text-center"
        >
          4
        </div>
      </div>

      <hr />
      <div className="p-1 flex flex-grow flex-shrink bg-black w-1/2">
        <div className="bg-red-400 p-1 border border-r-black flex-grow flex-shrink basis-1/4">
          1
        </div>
        <div className="bg-red-400 p-1 border border-r-black flex-grow flex-shrink-0 basis-1/4">
          2
        </div>
        <div className="bg-red-400 p-1 border border-r-black flex-grow flex-shrink-0 basis-40">
          3
        </div>
        <div className="bg-red-400 p-1 border border-r-black flex-grow flex-shrink basis-1/4">
          4
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {modalMessage}
        </p>
      </Modal>
    </>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}

// components/Modal.js
function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  // 点击遮罩层以关闭模态窗口
  const handleBackdropClick = (event: any) => {
    // 确保只有在点击遮罩层本身时才关闭模态窗口，而不是模态窗口内容
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={(e) => handleBackdropClick(e)}
    >
      <div className="bg-white p-5 rounded-lg">{children}</div>
    </div>
  );
}
