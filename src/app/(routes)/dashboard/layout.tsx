"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import { AuthProvider, useAuth } from "@/app/_context/ContextAuth";
import { MenuIcon, X } from "lucide-react";
import Loader from "@/app/_components/Loader";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();
  const [Loading, setLoading] = useState<Boolean>(true);
  const [open, setOpen] = useState(false);

  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    user && checkTeams();
  }, [user]);

  const checkTeams = async () => {
    setLoading?.(true);
    console.log("loading value set to true : " + Loading);
    console.log(user);
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email,
    });
    if (!result?.length) {
      router.push("teams/create");
    }
    setLoading?.(false);
    console.log("loading value set to false : " + Loading);
  };

  return (
    <AuthProvider>
      {Loading ? (
        <div><Loader/></div>
      ) : (
        <>
          <div className="grid grid-cols-4">
            <div className="h-full w-72 fixed max-[740px]:hidden">
              <SideNav />
            </div>
            <MenuIcon
              className="m-3 min-[740px]:hidden "
              onClick={() => {
                setOpen(true);
              }}
            />
            {open ? (
              <div className="h-full w-full fixed z-30 bg-white">
                <div className={open ? "p-1" : "hidden"}>
                  <X
                    onClick={() => {
                      setOpen && setOpen(false);
                      console.log("open value after clicking X:", open);
                    }}
                  />
                </div>
                <SideNav open={open} setChange={setOpen} />
              </div>
            ) : (
              <></>
            )}
            <div
              className={
                open
                  ? "z-5"
                  : "col-span-4 min-[740px]:ml-72 max-[740px]:w-full "
              }
            >
              {children}
            </div>
          </div>
        </>
      )}
    </AuthProvider>
  );
}

export default DashboardLayout;
