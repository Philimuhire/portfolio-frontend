import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminTable from "../components/AdminTable";
import DraggableModal from "../components/DraggableModal";
import FormField from "../components/FormField";
import FormActions from "../components/FormActions";
import { useToast } from "@/hooks/use-toast";
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
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

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
      } catch (error: any) {
        console.error(`Error fetching ${activeTab}:`, error);
        toast({
          title: "Error",
          description: `Failed to load ${activeTab}. ${error.response?.data?.message || "Please try again."}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, toast]);

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
    setSaving(true);
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

        // Update the list with edited item
        if (activeTab === "blogs") {
          setBlogs((prev) => prev.map((item) => item.id === editingItem.id ? { ...item, ...formData } : item));
        } else if (activeTab === "projects") {
          setProjects((prev) => prev.map((item) => item.id === editingItem.id ? { ...item, ...formData } : item));
        } else {
          setSkills((prev) => prev.map((item) => item.id === editingItem.id ? { ...item, ...formData } : item));
        }

        toast({
          title: "Success",
          description: `${activeTab.slice(0, -1)} updated successfully!`,
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

        toast({
          title: "Success",
          description: `${activeTab.slice(0, -1)} created successfully!`,
        });
      }
      setModalOpen(false);
      setFormData({});
    } catch (error: any) {
      console.error(`Error saving ${activeTab}:`, error);
      toast({
        title: "Error",
        description: `Failed to save ${activeTab.slice(0, -1)}. ${error.response?.data?.message || "Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
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

      toast({
        title: "Success",
        description: `${activeTab.slice(0, -1)} deleted successfully!`,
      });
    } catch (error: any) {
      console.error(`Error deleting ${activeTab}:`, error);
      toast({
        title: "Error",
        description: `Failed to delete ${activeTab.slice(0, -1)}. ${error.response?.data?.message || "Please try again."}`,
        variant: "destructive",
      });
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-x-hidden">
      <Sidebar
        tabs={["blogs", "projects", "skills"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex-1 p-4 md:p-8 w-0">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3 flex-wrap">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                    {tabData.length}
                  </span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg">
                  Manage your {activeTab} content
                </p>
              </div>
              <button
                className="bg-gradient-to-r from-primary to-primary/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold text-sm sm:text-base whitespace-nowrap"
                onClick={openAdd}
              >
                <span className="text-xl">+</span>
                Add {activeTab.slice(0, -1)}
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4">
                <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1">Total Items</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">{tabData.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4">
                <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1">Last Updated</p>
                <p className="text-base sm:text-lg font-semibold text-slate-800">
                  {tabData.length > 0 ? new Date().toLocaleDateString() : "—"}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4">
                <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1">Status</p>
                <p className="text-base sm:text-lg font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
              <p className="text-slate-600 text-lg">Loading {activeTab}...</p>
            </div>
          ) : tabData.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-slate-400">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No {activeTab} yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Get started by creating your first {activeTab.slice(0, -1)}
                </p>
                <button
                  onClick={openAdd}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Create {activeTab.slice(0, -1)}
                </button>
              </div>
            </div>
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
                <FormActions onCancel={() => setModalOpen(false)} isLoading={saving} />
              </form>
            </DraggableModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
