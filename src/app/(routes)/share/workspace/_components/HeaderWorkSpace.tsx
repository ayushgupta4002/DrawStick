import { Button } from "@/components/ui/button";
import { Save, Link2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FileType } from "../../../dashboard/_components/FlatList";
import Link from "next/link";

function WorkspaceHeader({
  trigger,
  fileData,
}: {
  trigger: any;
  fileData: FileType;
}) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <Link href={"/dashboard"}>
          {" "}
          <Image src={"/logo.png"} width={50} height={40} alt="" />
        </Link>
        <h2 className="text-xl font-bold">{fileData?.fileName}</h2>
        
      </div>
     
      <div className="flex items-center gap-4 ">
        <h2 className="ml-3 text-base text-gray-500 max-[470px]:text-sm text-right">shared by {fileData?.createdBy}</h2>


        {/* <Button
          className="h-8 text-[12px]
        gap-2 bg-yellow-500 hover:bg-yellow-600"
        >
          <Save
            className="h-4 w-4"
            onClick={() => {
              trigger();
              console.log("click triggered");
            }}
          />{" "}
          Save{" "}
        </Button> */}
      </div>
    </div>
  );
}

export default WorkspaceHeader;
