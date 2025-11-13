import React from "react";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  submitLabel = "Save",
  isLoading = false,
}) => {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
      >
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        )}
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </div>
  );
};

export default FormActions;
