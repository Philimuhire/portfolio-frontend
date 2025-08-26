import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminTable from "../components/AdminTable";
import DraggableModal from "../components/DraggableModal";
import FormField from "../components/FormField";
import FormActions from "../components/FormActions";
import type { Blog } from "@/types/blog";
import type { Project } from "@/types/project";
import type { Skill } from "@/types/skill";
import api from "@/api";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "blogs") {
          const res = await api.get("/api/blogs");
          setBlogs(res.data);
        } else if (activeTab === "projects") {
          const res = await api.get("/api/projects");
          setProjects(res.data);
        } else {
          const res = await api.get("/api/skills");
          setSkills(res.data);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const openAdd = () => {
    setEditingItem(null);
    setFormData({});
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setModalOpen(true);
  };

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const saveItem = async () => {
    try {
      const endpoint =
        activeTab === "blogs"
          ? "/api/blogs"
          : activeTab === "projects"
          ? "/api/projects"
          : "/api/skills";

      let payload: any = formData;

      if (formData.coverImage || formData.imageUrl) {
        const fd = new FormData();
        for (const key in formData) fd.append(key, formData[key]);
        payload = fd;
      }

      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, payload, {
          headers:
            payload instanceof FormData
              ? { "Content-Type": "multipart/form-data" }
              : {},
        });
      } else {
        const res = await api.post(endpoint, payload, {
          headers:
            payload instanceof FormData
              ? { "Content-Type": "multipart/form-data" }
              : {},
        });
        if (activeTab === "blogs") setBlogs((prev) => [...prev, res.data]);
        if (activeTab === "projects")
          setProjects((prev) => [...prev, res.data]);
        if (activeTab === "skills") setSkills((prev) => [...prev, res.data]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error(`Error saving ${activeTab}:`, error);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const endpoint =
        activeTab === "blogs"
          ? "/api/blogs"
          : activeTab === "projects"
          ? "/api/projects"
          : "/api/skills";
      await api.delete(`${endpoint}/${id}`);
      if (activeTab === "blogs") setBlogs(blogs.filter((b) => b.id !== id));
      if (activeTab === "projects")
        setProjects(projects.filter((p) => p.id !== id));
      if (activeTab === "skills") setSkills(skills.filter((s) => s.id !== id));
    } catch (error) {
      console.error(`Error deleting ${activeTab}:`, error);
    }
  };

  const tabColumns =
    activeTab === "blogs"
      ? [
          { key: "title", label: "Title" },
          { key: "content", label: "Content" },
          { key: "coverImage", label: "Cover Image" },
          { key: "tags", label: "Tags" },
        ]
      : activeTab === "projects"
      ? [
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "techStack", label: "Tech Stack" },
          { key: "githubLink", label: "GitHub" },
          { key: "liveLink", label: "Live Link" },
          { key: "imageUrl", label: "Image" },
        ]
      : [
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "percentage", label: "Percentage" },
        ];

  const tabData =
    activeTab === "blogs"
      ? blogs
      : activeTab === "projects"
      ? projects
      : skills;

  return (
    <div className="flex">
      <Sidebar
        tabs={["blogs", "projects", "skills"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="w-3/4 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <button
            className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={openAdd}
          >
            <span className="text-lg font-bold">+</span>
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading {activeTab}...</div>
        ) : (
          <AdminTable
            columns={tabColumns}
            data={tabData}
            onEdit={openEdit}
            onDelete={deleteItem}
          />
        )}

        {modalOpen && (
          <DraggableModal
            title={
              editingItem
                ? `Edit ${activeTab.slice(0, -1)}`
                : `Add ${activeTab.slice(0, -1)}`
            }
            onClose={() => setModalOpen(false)}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveItem();
              }}
              className="flex flex-col gap-4"
            >
              {tabColumns
                .filter((c) => c.key !== "id")
                .map((col) => (
                  <FormField
  key={col.key}
  label={col.label}
  name={col.key as string}
  value={formData[col.key] || ""}
  onChange={handleChange}
  textarea={col.key === "content"}
  richText={col.key === "content"}   
  type={
    col.key === "coverImage" || col.key === "imageUrl"
      ? "file"
      : "text"
  }
  required={
    activeTab === "blogs" ||

    (activeTab === "projects" &&
      col.key !== "githubLink" &&
      col.key !== "liveLink") ||

    activeTab === "skills"
  }
/>

                ))}
              <FormActions onCancel={() => setModalOpen(false)} />
            </form>
          </DraggableModal>
        )}
      </div>
    </div>
  );
};

export default Admin;
