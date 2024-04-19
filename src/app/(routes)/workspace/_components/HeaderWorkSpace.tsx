import { Button } from "@/components/ui/button";
import { Save, Link2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FileType } from "../../dashboard/_components/FlatList";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

function WorkspaceHeader({
  trigger,
  fileData,
}: {
  trigger: any;
  fileData: FileType;
}) {
  const {toast} = useToast()
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <Link href={"/dashboard"}>
          {" "}
          <Image src={"/logo.png"} width={50} height={40} alt="" />
        </Link>
        <h2 className="text-xl font-bold">{fileData?.fileName}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 text-[12px]
        gap-2 bg-yellow-500 hover:bg-yellow-600"
          onClick={() => {
            trigger();
            console.log("click triggered");
          }}
        >
          <Save className="h-4 w-4" /> Save{" "}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-8 text-[12px]
        gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Share <Link2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="py-2">Share this link !!</DialogTitle>
              <DialogDescription className="border border-gray-400 rounded-lg p-2 mt-2">
                <div>http://localhost:3000/share/workspace/{fileData?._id}</div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000/share/workspace/${fileData?._id}`
                  ).then(
                    (resp)=>{
                     alert("link copied")
                    }
                  )
                }
              >
                Copy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
