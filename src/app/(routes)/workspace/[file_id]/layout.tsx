"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loader from "../../../_components/Loader";
import { AuthProvider, useAuth } from "../../../_context/ContextAuth";

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {Loading} = useAuth();
  const router = useRouter();
  console.log(Loading)
  return (
    <>
      {Loading ? (
        <div><Loader/></div>
      ) : (
        <>
            <div>
              {children}
            </div>
        </>
      )}
    </>
  );
}

export default WorkspaceLayout;
