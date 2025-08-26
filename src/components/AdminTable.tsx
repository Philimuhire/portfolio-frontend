import React from "react";

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
    return 20; 
  };

  return (
    <table className="w-full border-collapse table-fixed">
  <thead>
    <tr>
      {columns.map((col) => (
        <th
          key={col.key}
          className="border px-2 py-1 text-left truncate"
          style={{
            width:
              col.key === "content" || col.key === "description"
                ? "200px"
                : col.key === "techStack" ||
                  col.key === "githubLink" ||
                  col.key === "liveLink" ||
                  col.key === "imageUrl"
                ? "100px"
                : "100px",
          }}
        >
          {col.label}
        </th>
      ))}
      <th className="border px-2 py-1" style={{ width: "120px" }}>
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item.id} className="hover:bg-gray-50">
        {columns.map((col) => (
          <td
            key={col.key}
            className="px-4 py-2 border-b truncate"
            style={{
              width:
                col.key === "content" || col.key === "description"
                  ? "200px"
                  : col.key === "techStack" ||
                    col.key === "githubLink" ||
                    col.key === "liveLink" ||
                    col.key === "imageUrl"
                  ? "100px"
                  : "100px",
            }}
          >
            {truncateText(String(item[col.key]), getMaxLength(col.key))}
          </td>
        ))}
        <td
          className="px-4 py-2 border-b space-x-2"
          style={{ width: "120px" }}
        >
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  );
};

export default AdminTable;
