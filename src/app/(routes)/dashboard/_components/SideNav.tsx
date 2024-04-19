import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import SideNavTop, { TEAM } from "./SideNavTop";
import { Popover, PopoverTrigger , PopoverContent } from "@/components/ui/popover";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottom from "./SideNavBottom";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuth } from "@/app/_context/ContextAuth";
import { useToast } from "@/components/ui/use-toast";

function SideNav() {
    const {setFiles} = useAuth();
    const { toast } = useToast();

    const { user } = useKindeBrowserClient();
    const[ activeTeam , setActiveTeam] = useState<TEAM | any>();
    const createNewFile = useMutation(api.files.createFile);
    const convex = useConvex();

    useEffect(()=>{
        activeTeam&&getFiles();
      },[activeTeam])

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
            getFiles();
            toast({
              title: "File Saved",
              description: "Hurray ! your File is saved ! ",
            })
  
            
        }).catch((error)=>{
            console.log(error);
            toast({
              title: "Error",
              description: "There was some error while saving the file!",
            })
        })
    }

    const getFiles=async()=>{
        const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id});
        console.log(result);
        if (setFiles) { 
            setFiles(result);
          } else {
            console.error("setFiles is not defined");
          }
       
      }
    

  return (
  
    <div className="border borer-[1px] h-screen flex flex-col justify-between border-gray-200 fixed h-full w-72  p-3">
     <SideNavTop user ={user}  setActiveTeamId={setActiveTeam}/>
     
    <SideNavBottom createFile={CreateFile}/>
    </div>
    
  );
}

export default SideNav;
