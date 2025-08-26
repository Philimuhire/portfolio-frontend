import React from "react";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  submitLabel = "Save",
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-black px-4 py-2 rounded"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {submitLabel}
      </button>
    </div>
  );
};

export default FormActions;
