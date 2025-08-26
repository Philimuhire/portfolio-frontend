import React, { useRef } from "react";
import Draggable from "react-draggable";

interface DraggableModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  title,
  onClose,
  children,
}) => {
  const nodeRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Draggable handle=".modal-header" nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className="bg-white rounded shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col"
        >
          <div className="modal-header bg-gray-200 px-4 py-2 cursor-move flex justify-between items-center">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              ✕
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">{children}</div>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableModal;
