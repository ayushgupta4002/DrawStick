"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { FileType } from "../../../dashboard/_components/FlatList";
import { useToast } from "@/components/ui/use-toast";

function Editor({
  trigger,
  file_id,
  fileData,
}: {
  trigger: any;
  file_id: any;
  fileData: FileType;
}) {
  const ref = useRef<EditorJS>();
  const toast = useToast();
  const updatedoc = useMutation(api.files.updateDocument);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

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
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
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
              console.log(resp);
              toast.toast({
                title: "Document Updated!",
                description: "Your Document was updated successfully!",
              });
            },
            (e) => {
              toast.toast({
                title: "Error",
                description: "There was some error saving the document!",
              });
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
