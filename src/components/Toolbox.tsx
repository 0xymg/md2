import React, { useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Table,
  Minus,
  CheckSquare,
  Smile
} from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface ToolboxProps {
  onAction: (action: string) => void;
}

export default function Toolbox({ onAction }: ToolboxProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const tools = [
    { icon: Bold, action: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, action: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: Heading1, action: 'h1', tooltip: 'Heading 1' },
    { icon: Heading2, action: 'h2', tooltip: 'Heading 2' },
    { icon: Heading3, action: 'h3', tooltip: 'Heading 3' },
    { icon: List, action: 'ul', tooltip: 'Unordered List' },
    { icon: ListOrdered, action: 'ol', tooltip: 'Ordered List' },
    { icon: CheckSquare, action: 'task', tooltip: 'Task List' },
    { icon: Link2, action: 'link', tooltip: 'Link (Ctrl+K)' },
    { icon: Image, action: 'image', tooltip: 'Image' },
    { icon: Code, action: 'code', tooltip: 'Code Block' },
    { icon: Quote, action: 'quote', tooltip: 'Blockquote' },
    { icon: Table, action: 'table', tooltip: 'Table' },
    { icon: Minus, action: 'hr', tooltip: 'Horizontal Rule' },
  ];

  const handleEmojiSelect = (emoji: any) => {
    onAction(`emoji:${emoji.native}`);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <div className="flex flex-wrap gap-1">
        {tools.map(({ icon: Icon, action, tooltip }) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
            title={tooltip}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-1.5 rounded hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
          title="Emoji Picker"
        >
          <Smile className="w-4 h-4" />
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute z-10 mt-1">
          <div className="fixed inset-0" onClick={() => setShowEmojiPicker(false)} />
          <div className="relative">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              previewPosition="none"
              skinTonePosition="none"
            />
          </div>
        </div>
      )}
    </div>
  );
}