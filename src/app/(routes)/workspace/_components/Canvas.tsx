import React from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
function Canvas() {
  return (
    <div>
      <div className="h-screen ">
        <Excalidraw
          onChange={(excalidrawElements, appState, files) => {
            console.log(excalidrawElements);
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
        </Excalidraw>
      </div>
    </div>
  );
}

export default Canvas;
