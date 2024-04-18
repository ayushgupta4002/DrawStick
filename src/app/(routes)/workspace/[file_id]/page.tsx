"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/HeaderWorkSpace";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FileType } from "../../dashboard/_components/FlatList";
import Canvas from "../_components/Canvas";

function page({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const [DocData, setDocData] = useState<FileType | any>();
  const convex = useConvex();
  useEffect(() => {
    getFileData();
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.file_id,
    });
    console.log(result);
    setDocData(result);
  };

  return (
    <div>
      <WorkspaceHeader trigger={() => setTriggerSave(!triggerSave)} />
      <div className="flex flex-col md:flex-row">
        <div className=" h-screen w-[40%]">
          <Editor
            trigger={triggerSave}
            file_id={params.file_id}
            fileData={DocData}
          />
        </div>
        <div className=" h-screen w-[60%] border-l">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default page;
