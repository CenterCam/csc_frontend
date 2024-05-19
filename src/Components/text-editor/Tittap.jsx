import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar flex flex-wrap gap-3 p-3 min-h-16">
      <div>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleUnderline().run();
          }}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleStrike().run();
          }}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().undo().run();
          }}>
          <FaUndo />
        </button>
        <button onClick={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            editor.chain().focus().redo().run();
          }}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Underline,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const Tiptap = ({ setDescription ,data }) => {
  const editor = useEditor({
    extensions,
    content: data  ,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
