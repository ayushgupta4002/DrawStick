import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/app/_context/ContextAuth";
import {
  Archive,
  ArchiveXIcon,
  Delete,
  DeleteIcon,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export interface FileType {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FlatList() {
  const { File, setFiles } = useAuth();
  const convex = useConvex();

  // console.log(File);
  const router = useRouter();

  return (
    <div className="mt-3 mx-3">
      <Table>
        <TableCaption>A list of your recent Files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Created At</TableHead>
            {/* <TableHead>Edited At</TableHead> */}
            <TableHead className="text-left">Author</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {File &&
            File.map((item: FileType, index: number) => (
              <TableRow
                key={index}
                onClick={() => router.push("/workspace/" + item._id)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{item.fileName}</TableCell>
                <TableCell>
                  {new Date(item._creationTime).toLocaleDateString()}
                </TableCell>
                {/* <TableCell>Credit Card</TableCell> */}
                <TableCell className="text-left">{item.createdBy}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <MoreHorizontal className="focus:outline-none" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="gap-3"
                        onClick={async () => {
                          console.log(item._id);
                          const result = await convex
                            .mutation(api.files.deleteById, {
                              _id: item._id as Id<"files">,
                            })
                            .then((resp) => {
                              if (setFiles) {
                                setFiles((prevFiles: FileType[]) =>
                                  prevFiles.filter(
                                    (file: FileType) => file._id !== item._id
                                  )
                                );
                              }
                            });
                        }}
                      >
                        <Delete className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FlatList;
