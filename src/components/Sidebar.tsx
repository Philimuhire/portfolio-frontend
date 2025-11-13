import React from "react";
import { FileText, FolderKanban, Sparkles, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabChange }) => {
  const { logout } = useAuth();

  const getIcon = (tab: string) => {
    switch (tab) {
      case "blogs":
        return <FileText className="w-5 h-5" />;
      case "projects":
        return <FolderKanban className="w-5 h-5" />;
      case "skills":
        return <Sparkles className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 sm:p-6 flex flex-col flex-shrink-0">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Admin Panel</h2>
        <p className="text-xs sm:text-sm text-slate-500">Manage your content</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => onTabChange(tab)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-md transform scale-105"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {getIcon(tab)}
                <span className="font-medium text-sm sm:text-base">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="text-xs text-slate-600 mb-1 font-semibold">Quick Tip</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click on any item to edit, or use the Add button to create new content.
          </p>
        </div>
      </nav>

      <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-200 space-y-2">
        <Link to="/">
          <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Back to Site</span>
          </button>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
