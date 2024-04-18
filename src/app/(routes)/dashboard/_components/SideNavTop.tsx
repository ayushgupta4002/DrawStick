import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}

function SideNavTop({ user , setActiveTeamId }: any) {
  const router = useRouter();
  //   const { user } = useKindeBrowserClient();


  const convex = useConvex();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();

  useEffect(() => {
    user && getTeam();
  }, [user]);

  useEffect(()=>{
    setActiveTeamId(activeTeam);
    console.log(activeTeam);
  },[activeTeam])

  const getTeam = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email ?? "",
    });
    console.log("TeamList", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="items-center  cursor-pointer mt-4 flex flex-row justify-center gap-4 hover:bg-gray-200 rounded-lg p-2 m-2">
            <div className="text-center font-bold ">{activeTeam?.teamName}</div>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7">
          <div>
            {teamList?.map((team, index) => (
              <h2
                key={index}
                className={`p-2 hover:bg-blue-500
                         hover:text-white
                         rounded-lg mb-1 cursor-pointer
                         ${activeTeam?._id == team._id && "bg-blue-500 text-white"}`}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName}
              </h2>
            ))}
          </div>

          <hr className="my-1"></hr>
          <div>
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => {
                  if (item.path) {
                    router.push(item.path);
                  }
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2
                className="flex gap-2 items-center
                        p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        className="w-full justify-start
          gap-2 font-bold mt-8 bg-gray-100"
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
    </div>
  );
}

export default SideNavTop;
