import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface AdminTableProps {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const AdminTable: React.FC<AdminTableProps> = ({ data, columns, onEdit, onDelete }) => {
  const getMaxLength = (key: string) => {
    if (["content", "description"].includes(key)) return 80;
    if (["techStack", "github", "image"].includes(key)) return 50;
    return 30;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    <div className="max-w-xs">
                      {col.key === "coverImage" || col.key === "imageUrl" ? (
                        item[col.key] ? (
                          <img
                            src={item[col.key]}
                            alt="Preview"
                            className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                          />
                        ) : (
                          <span className="text-slate-400 italic">No image</span>
                        )
                      ) : col.key === "tags" || col.key === "techStack" ? (
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(item[col.key]) ? (
                            item[col.key].slice(0, 3).map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                          {Array.isArray(item[col.key]) && item[col.key].length > 3 && (
                            <span className="text-xs text-slate-500">+{item[col.key].length - 3}</span>
                          )}
                        </div>
                      ) : col.key === "content" ? (
                        <div
                          className="text-slate-600 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: truncateText(String(item[col.key]), getMaxLength(col.key))
                          }}
                        />
                      ) : (
                        <span className="text-slate-800">
                          {truncateText(String(item[col.key] || "—"), getMaxLength(col.key))}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
