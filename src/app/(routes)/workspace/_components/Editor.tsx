"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { FileType } from "../../dashboard/_components/FlatList";


function Editor({ trigger , file_id ,  fileData}: {trigger:any , file_id:any , fileData : FileType}) {
  const ref = useRef<EditorJS>();
  const updatedoc = useMutation(api.files.updateDocument);

  useEffect(()=>{
    fileData&&initEditor();
},[fileData])

  useEffect(() => {
    console.log(trigger);
    trigger && onSaveDocument();
  }, [trigger]);

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
      data: fileData?.document?JSON.parse(fileData.document):rawDocument,
    });
    ref.current = editor;
  };

  const onSaveDocument = async () => {
    if (ref.current) {
      await ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updatedoc({
            _id: file_id,
            document: JSON.stringify(outputData),
          }).then(
            (resp) => {
              console.log(resp)
              toast("Document Updated!");
            },
            (e) => {
              toast("Server Error!");
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div className="ml-5">
      <div id="editorjs" className="pl-2 md:pl-12"></div>
    </div>
  );
}

export default Editor;
