import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  textarea?: boolean;
  richText?: boolean;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  richText = false,
  required = false,
}) => {
  const editor = richText
    ? useEditor({
        extensions: [StarterKit, Underline, BulletList, OrderedList, ListItem, Link],
        content: value || "",
        onUpdate: ({ editor }) => {
          onChange(name, editor.getHTML());
        },
      })
    : null;

  const setLink = () => {
    const url = prompt("Enter URL");
    if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "file" ? (
        <div>
          <input
            type="file"
            name={name}
            onChange={(e) => e.target.files && onChange(name, e.target.files[0] as any)}
            accept="image/*"
            required={required}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="mt-1 text-xs text-slate-500">Upload an image file (JPG, PNG, etc.)</p>
        </div>
      ) : richText && editor ? (
        <>
          <div className="mb-3 flex gap-2 flex-wrap p-2 bg-slate-50 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1.5 rounded-md font-bold text-sm transition-colors ${
                editor.isActive("bold")
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-300 hover:bg-slate-100"
              }`}
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1.5 rounded-md italic text-sm transition-colors ${
                editor.isActive("italic")
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-300 hover:bg-slate-100"
              }`}
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-3 py-1.5 rounded-md underline text-sm transition-colors ${
                editor.isActive("underline")
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-300 hover:bg-slate-100"
              }`}
              title="Underline"
            >
              U
            </button>
            <div className="w-px bg-slate-300"></div>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                editor.isActive("bulletList")
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-300 hover:bg-slate-100"
              }`}
              title="Bullet List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                editor.isActive("orderedList")
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-300 hover:bg-slate-100"
              }`}
              title="Numbered List"
            >
              1. List
            </button>
            <button
              type="button"
              onClick={setLink}
              className="px-3 py-1.5 rounded-md text-sm bg-white border border-slate-300 hover:bg-slate-100 text-primary transition-colors"
              title="Insert Link"
            >
              🔗 Link
            </button>
          </div>

          <div className="border-2 border-slate-300 p-4 rounded-lg w-full min-h-[400px] bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all custom-scrollbar overflow-y-auto">
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>
          <p className="mt-1 text-xs text-slate-500">Use the toolbar above to format your content</p>
        </>
      ) : textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          rows={name === "content" || name === "description" ? 15 : 5}
          className="border-2 border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y custom-scrollbar text-slate-700"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="border-2 border-slate-300 p-3 rounded-lg w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-700"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
};

export default FormField;
