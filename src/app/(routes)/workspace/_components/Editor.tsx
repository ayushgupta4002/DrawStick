"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header, { HeaderToolConfig } from "@editorjs/header";
function Editor() {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    initEditor();
  }, []);

  const rawDocument = {
    time: 1550476186479,
    blocks: [
      {
        data: {
          text: "Document Name",
          level: 2,
        },
        id: "123",
        type: "header",
      },
      {
        data: {
          level: 4,
        },
        id: "1234",
        type: "header",
      },
    ],
    version: "2.8.1",
  };

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          //@ts-ignore
          class: Header,
          config: {
            placeholder: "Enter a header",
          },
        },
      },
      holder: "editorjs",
      data: rawDocument,
    });
    ref.current = editor;
  };
  return (
    <div className="ml-5">
      <div id="editorjs" className="pl-2 md:pl-12"></div>
    </div>
  );
}

export default Editor;
