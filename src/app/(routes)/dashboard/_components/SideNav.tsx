import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import SideNavTop, { TEAM } from "./SideNavTop";
import { Popover, PopoverTrigger , PopoverContent } from "@/components/ui/popover";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottom from "./SideNavBottom";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

function SideNav() {
    const { user } = useKindeBrowserClient();
    const[ activeTeam , setActiveTeam] = useState<TEAM | any>();
    const createNewFile = useMutation(api.files.createFile);
    const convex = useConvex();

    const CreateFile= async(inputFile : String) =>{
        console.log(inputFile)
        
        createNewFile({
            fileName:inputFile.toString(),
            teamId:activeTeam?._id ,
            createdBy:user?.email ?? "",
            archive:false,
            document:'',
            whiteboard:''
        }).then((resp) => {
            console.log(resp);
            toast("File Saved !")
            
        }).catch((error)=>{
            console.log(error);
            toast("There was an Error saving file")
        })
    }

    const getFiles=async()=>{
        const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id});
        console.log(result);
       
      }
    

  return (
  
    <div className="border borer-[1px] h-screen flex flex-col justify-between border-gray-200 fixed h-full w-72  p-3">
     <SideNavTop user ={user}  setActiveTeamId={setActiveTeam}/>
     
    <SideNavBottom createFile={CreateFile}/>
    </div>
    
  );
}

export default SideNav;
