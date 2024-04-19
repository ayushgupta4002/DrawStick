import React, { useEffect, useState } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { FileType } from "../../../dashboard/_components/FlatList";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
function Canvas({
  trigger,
  file_id,
  fileData,
}: {
  trigger: any;
  file_id: any;
  fileData: FileType;
}) {


  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  console.log(fileData?.whiteboard)

  const updateWhiteboard=useMutation(api.files.updateWhiteboardCanvas);

  useEffect(() => {
    trigger && saveCanvas();
  }, [trigger]);

  const saveCanvas = async () => {
    await updateWhiteboard({
        _id:file_id,
        whiteboard:JSON.stringify(whiteBoardData)
    }).then(resp=>console.log(resp))
  };

  return (
    <div>
      <div className="h-screen ">
      {fileData&& <Excalidraw
          onChange={(excalidrawElements, appState, files) => {
            // console.log(excalidrawElements);
            setWhiteBoardData(excalidrawElements);
          }}
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw> }
      </div>
    </div>
  );
}

export default Canvas;
