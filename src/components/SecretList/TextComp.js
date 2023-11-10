import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Secret.css";

const RichTextEditor = ({ value, onChange, customclassName }) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        ["link", "image", "draw"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      className={customclassName}
    />
  );
};

export default RichTextEditor;
