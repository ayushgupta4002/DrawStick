"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function CreateTeams() {
  const [TeamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.SaveTeams);
  const { user } = useKindeBrowserClient();
  const { toast } = useToast();
  const router = useRouter()

  const submitTeam = async () => {
    // console.log(TeamName + "~~ line 9 ~~ create page team name " )

    user?.email &&
      createTeam({
        teamName: TeamName,
        createdBy: user?.email,
      })
        .then((resp) => {
          console.log(resp + "  ~~ response after saving Team");
          router.push('/dashboard')
          toast({
            title: "Team Saved",
            description: "Hurray ! your team is saved ! ",
          })

        })
        .catch((error) => console.log(error));
  };
  return (
    <div className="flex h-screen  flex-col  justify-center">
      <div>
        <h2 className="font-bold text-center text-3xl">
          What Should We Name Your Team ?{" "}
        </h2>
        <h2 className="font-medium py-5 text-center text-gray-500 text-base">
          You can always change this later from settings{" "}
        </h2>
      </div>
      <div className="grid w-full mx-auto px-4 max-w-sm items-center gap-1.5 pt-4">
        <Label htmlFor="email " className="text-lg  text-gray-600">
          Team Name
        </Label>
        <Input
          type="email"
          className="border border-black"
          id="email"
          placeholder="Email"
          onChange={(e) => {
            setTeamName(e.target.value);
            // console.log(TeamName + " ~~ line 32 create page onChange team name");
          }}
        />
      </div>
      <div className="mx-auto max-w-sm items-center  mt-8 pt-4">
        <Button
          className="px-20"
          onClick={submitTeam}
          disabled={!(TeamName && TeamName.length > 0)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateTeams;
