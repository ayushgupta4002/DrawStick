"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import { AuthProvider } from "@/app/_context/ContextAuth";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();

  console.log(user);

  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    user && checkTeams();
  }, [user]);

  const checkTeams = async () => {
    console.log(user.email);
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email,
    });
    if (!result?.length) {
      router.push("teams/create");
    }
  };

  return (
    <AuthProvider>
    <div className="grid grid-cols-4 ">
      <div className="h-full w-72 fixed"><SideNav/></div>
      <div className="col-span-4 ml-72" >{children}</div>
    </div>
    </AuthProvider>
  );
}

export default DashboardLayout;
