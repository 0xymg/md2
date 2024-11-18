import React from 'react';
import { FileEdit, Eye } from 'lucide-react';

interface TabSwitcherProps {
  activeTab: 'edit' | 'preview';
  onTabChange: (tab: 'edit' | 'preview') => void;
}

export default function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="sm:hidden bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 py-3">
          <button
            onClick={() => onTabChange('edit')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'edit'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileEdit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => onTabChange('preview')}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'preview'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}