import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "align",
  ];

  if (!ReactQuill) {
    return (
      <div className="border rounded-md p-12 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="rich-text-editor" data-testid="editor-rich-text">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Start writing your article..."}
        className="bg-background"
      />
      <style>{`
        .rich-text-editor .ql-container {
          min-height: 400px;
          font-size: 16px;
          line-height: 1.8;
        }
        
        .rich-text-editor .ql-editor {
          min-height: 400px;
        }
        
        .rich-text-editor .ql-editor p {
          margin-bottom: 1em;
        }
        
        .rich-text-editor .ql-editor h1,
        .rich-text-editor .ql-editor h2,
        .rich-text-editor .ql-editor h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5em 0;
        }
        
        .rich-text-editor .ql-editor .ql-video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.5rem;
          margin: 1.5em 0;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: hsl(var(--card));
          border-color: hsl(var(--border));
        }
        
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-color: hsl(var(--border));
          background: hsl(var(--background));
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
        
        .dark .rich-text-editor .ql-stroke {
          stroke: hsl(var(--foreground));
        }
        
        .dark .rich-text-editor .ql-fill {
          fill: hsl(var(--foreground));
        }
        
        .dark .rich-text-editor .ql-picker-label {
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}
