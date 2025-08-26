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
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      {type === "file" ? (
        <input
          type="file"
          name={name}
          onChange={(e) => e.target.files && onChange(name, e.target.files[0] as any)}
          accept="image/*"
          required={required}
          className="border p-2 rounded w-full"
        />
      ) : richText && editor ? (
        <>
          <div className="mb-2 flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="px-2 py-1 border rounded font-bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="px-2 py-1 border rounded italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="px-2 py-1 border rounded underline"
            >
              U
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="px-2 py-1 border rounded"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="px-2 py-1 border rounded"
            >
              1. List
            </button>
            <button
              type="button"
              onClick={setLink}
              className="px-2 py-1 border rounded text-blue-600"
            >
              Link
            </button>
          </div>

          <div className="border p-2 rounded w-full min-h-[200px]"> {/* taller */}
            <EditorContent editor={editor} />
          </div>
        </>
      ) : textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          rows={name === "content" || name === "description" ? 8 : 4} 
          className="border p-2 rounded w-full"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="border p-2 rounded w-full"
        />
      )}
    </div>
  );
};

export default FormField;
