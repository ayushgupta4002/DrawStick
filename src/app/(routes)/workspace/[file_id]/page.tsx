"use client";
import React, { useEffect, useRef, useState } from "react";
import WorkspaceHeader from "../_components/HeaderWorkSpace";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FileType } from "../../dashboard/_components/FlatList";
import Canvas from "../_components/Canvas";

import Loader from "@/app/_components/Loader";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function Page({ params }: any) {
  const { user }: any = useKindeBrowserClient();
  const [triggerSave, setTriggerSave] = useState(false);
  const [DocData, setDocData] = useState<FileType | any>();
  const convex = useConvex();
  const methodRef = useRef<{ someMethod: () => void } | null>(null); // Provide type information here
  const [Loading, setLoading] = useState(true);
  const [EditorStatus, SetEditorStatus] = useState(true);
  const [userData, setUserData] = useState<any[]>();
  useEffect(() => {
    getFileData();
  }, []);
  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    console.log(user?.email);
    const result = await convex.query(api.user.getuser, {
      email: user?.email ?? "",
    });
    setUserData(result);
    console.log(result);
  };

  const getFileData = async () => {
    setLoading(true);
    const result = await convex.query(api.files.getFileById, {
      _id: params.file_id,
    });
    console.log(result);
    setDocData(result);
    setLoading(false);
  };

  const onSetEditorStatus = (state: boolean) => {
    console.log("change states");

    SetEditorStatus(state);
    console.log(EditorStatus);
  };
  console.log(userData);

  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
       
            <div>
              <WorkspaceHeader
                trigger={() => setTriggerSave(!triggerSave)}
                fileData={DocData}
                methodRef={methodRef}
                EditorStatus={EditorStatus}
                onSetEditorStatus={onSetEditorStatus}
                userData={userData}
              />
              <div className="flex flex-col md:flex-row">
                <div
                  className={
                    EditorStatus == true
                      ? "h-screen w-[40%] max-[770px]:w-full"
                      : "hidden"
                  }
                >
                  <Editor
                    trigger={triggerSave}
                    file_id={params.file_id}
                    fileData={DocData}
                    EditorStatus={EditorStatus}
                    onSetEditorStatus={onSetEditorStatus}
                  />
                </div>
                <div
                  className={
                    EditorStatus == true
                      ? "h-screen w-[60%] border-l max-[770px]:w-full"
                      : "h-screen w-[100%] border-l max-[770px]:w-full"
                  }
                >
                  <Canvas
                    trigger={triggerSave}
                    file_id={params.file_id}
                    fileData={DocData}
                    methodRef={methodRef}
                    setLoading={setLoading}
                    userData={userData}
                  />
                </div>
              </div>
            </div>
          
        </>
      )}
    </>
  );
}

export default Page;
