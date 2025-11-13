import React, { useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { X, GripHorizontal } from "lucide-react";

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

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Draggable handle=".modal-header" nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        >
          {/* Modal Header */}
          <div className="modal-header bg-gradient-to-r from-primary to-primary/90 px-6 py-4 cursor-move flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-3">
              <GripHorizontal className="w-5 h-5 text-white/70" />
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {children}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableModal;
