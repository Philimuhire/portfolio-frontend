import React from "react";

interface SidebarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`cursor-pointer p-2 rounded ${
              activeTab === tab ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
