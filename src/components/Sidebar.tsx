import React from 'react';
import { ChevronLeft, ChevronRight, FileText, FolderOpen, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <span className={`font-semibold truncate ${isOpen ? 'block' : 'hidden'}`}>
          Documents
        </span>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <FileText size={18} />
            <span className={isOpen ? 'block' : 'hidden'}>New Document</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            <FolderOpen size={18} />
            <span className={isOpen ? 'block' : 'hidden'}>Open Folder</span>
          </button>
        </div>
      </div>

      <div className="p-2 border-t border-gray-200">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md">
          <Settings size={18} />
          <span className={isOpen ? 'block' : 'hidden'}>Settings</span>
        </button>
      </div>
    </div>
  );
}