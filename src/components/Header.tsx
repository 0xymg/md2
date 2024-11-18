import React from 'react';
import { FileEdit, Upload, Download } from 'lucide-react';

interface HeaderProps {
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export default function Header({ onImport, onExport }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FileEdit className="h-6 w-6 text-indigo-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Markdown Editor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".md,.markdown"
                onChange={onImport}
                className="hidden"
              />
              <Upload className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </label>
            <button onClick={onExport}>
              <Download className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}