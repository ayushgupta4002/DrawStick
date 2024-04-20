import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  Excalidraw,
  WelcomeScreen,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import { FileType } from "../../dashboard/_components/FlatList";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
//@ts-ignore
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useRouter } from "next/navigation";

function Canvas({
  trigger,
  file_id,
  fileData,
  methodRef,
  setLoading,
}: {
  trigger: any;
  file_id: any;
  fileData: FileType;
  methodRef: any;
  setLoading: any;
}) {
  var mermaidCode = `
  graph TD;

  subgraph "Client Side"
      A[User] --> B(Website)
  end

  subgraph "Server Side"
      B --> C{Routing}
      C --> |GET /| D(GetHomepage)
      C --> |GET /posts| E(GetAllPosts)
      C --> |GET /posts/:id| F(GetPostById)
      C --> |POST /posts| G(CreatePost)
      C --> |PUT /posts/:id| H(UpdatePost)
      C --> |DELETE /posts/:id| I(DeletePost)
      C --> |GET /tags| J(GetAllTags)
      C --> |GET /tags/:tag| K(GetPostsByTag)
  end

  subgraph "Database"
      G1["posts (id, title, content, author_id, created_at, updated_at)"]
      G2["tags (id, name)"]
      G3["post_tags (post_id, tag_id)"]
      G1 --> G3
      G2 --> G3
  end

  subgraph "Functions"
      D --> D1[Render Homepage]
      E --> E1[Fetch All Posts]
      F --> F1[Fetch Post by ID]
      G --> G1[Create Post]
      H --> H1[Update Post]
      I --> I1[Delete Post]
      J --> J1[Fetch All Tags]
      K --> K1[Fetch Posts by Tag]
  end
  `;

const router = useRouter();

  const [whiteBoardData, setWhiteBoardData] = useState<any>();
 

  const updateWhiteboard = useMutation(api.files.updateWhiteboardCanvas);

  useEffect(() => {
    trigger && saveCanvas();
  }, [trigger]);





  const saveCanvas = async () => {
    await updateWhiteboard({
      _id: file_id,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };




  const getAutoDesign = async () => {
    //some code to get design from api in mermaid code!

    //code to fit that deign in canvas
    setLoading(true);
    const { elements, files } = await parseMermaidToExcalidraw(mermaidCode, {
      fontSize: 14,
    });
    const excalidrawElements = convertToExcalidrawElements(elements);
    setWhiteBoardData(excalidrawElements);
    console.log(excalidrawElements);
    await updateWhiteboard({
      _id: file_id,
      whiteboard: JSON.stringify(excalidrawElements),
    }).then(async(resp) =>{
      window.location.reload()
        });
  };



  methodRef.current = {
    someMethod: getAutoDesign,
  };


  
  return (
    <div>
      <div className="h-screen ">
        {fileData && (
          <Excalidraw
            onChange={(excalidrawElements) => {
              // console.log(excalidrawElements);
              setWhiteBoardData(excalidrawElements);
            }}
            initialData={{
              elements:
                fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
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
        )}
      </div>
    </div>
  );
}

export default Canvas;
