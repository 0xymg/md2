import React from 'react';
import Header from './Header';
import Toolbox from './Toolbox';
import TabSwitcher from './TabSwitcher';
import Sidebar from './Sidebar';
import MarkdownPreview from './MarkdownPreview';
import { defaultMarkdown } from '../utils/defaultContent';

export default function Editor() {
  const [markdown, setMarkdown] = React.useState(defaultMarkdown);
  const [activeTab, setActiveTab] = React.useState<'edit' | 'preview'>('edit');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleToolAction = (action: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;

    if (action.startsWith('emoji:')) {
      replacement = action.substring(6);
      cursorOffset = 0;
    } else {
      switch (action) {
        case 'bold':
          replacement = `**${selectedText || 'bold text'}**`;
          cursorOffset = selectedText ? 0 : -2;
          break;
        case 'italic':
          replacement = `_${selectedText || 'italic text'}_`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'h1':
          const needsNewlineBefore = start > 0 && text[start - 1] !== '\n';
          replacement = `${needsNewlineBefore ? '\n' : ''}# ${selectedText || 'Heading 1'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'h2':
          const needsNewlineBeforeH2 = start > 0 && text[start - 1] !== '\n';
          replacement = `${needsNewlineBeforeH2 ? '\n' : ''}## ${selectedText || 'Heading 2'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'h3':
          const needsNewlineBeforeH3 = start > 0 && text[start - 1] !== '\n';
          replacement = `${needsNewlineBeforeH3 ? '\n' : ''}### ${selectedText || 'Heading 3'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'ul':
          replacement = `\n- ${selectedText || 'List item'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'ol':
          replacement = `\n1. ${selectedText || 'List item'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'task':
          replacement = `\n- [ ] ${selectedText || 'Task item'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'link':
          replacement = `[${selectedText || 'link text'}](url)`;
          cursorOffset = -1;
          break;
        case 'image':
          replacement = `![${selectedText || 'alt text'}](url)`;
          cursorOffset = -1;
          break;
        case 'code':
          replacement = `\n\`\`\`\n${selectedText || 'code'}\n\`\`\`\n`;
          cursorOffset = selectedText ? 0 : -4;
          break;
        case 'quote':
          replacement = `\n> ${selectedText || 'quote'}\n`;
          cursorOffset = selectedText ? 0 : -1;
          break;
        case 'table':
          replacement = '\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n';
          break;
        case 'hr':
          replacement = '\n---\n';
          break;
      }
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      const newPosition = start + replacement.length + cursorOffset;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setMarkdown(e.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header onImport={handleFileImport} onExport={handleExport} />
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 p-4">
          <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {/* Editor Panel */}
              <div className={`h-full flex flex-col ${activeTab === 'edit' || 'hidden sm:block'}`}>
                <Toolbox onAction={handleToolAction} />
                <textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="flex-1 w-full p-4 font-mono text-sm bg-gray-50 focus:bg-white focus:outline-none resize-none"
                  placeholder="Enter markdown here..."
                />
              </div>

              {/* Preview Panel */}
              <div className={`h-full ${activeTab === 'preview' || 'hidden sm:block'}`}>
                <MarkdownPreview content={markdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}