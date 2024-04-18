"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { use, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import Header from "./_components/Header";
import FlatList from "./_components/FlatList";

function Dashboard() {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser()
    }
  }, [user]);

  const checkUser = async () => {
    // console.log(user?.email)
    const result = await convex.query(api.user.getuser, {
      email: user?.email ?? "" ,
    });
    // console.log(result);
    if (!result.length) {
      console.log("user does not exist")
      createUser({
        name: user?.given_name ?? "",
        email: user?.email ?? "",
      })
        .then((resp) => console.log(resp))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="p-8">
    <Header/>
    <FlatList />
    </div>
  );
}

export default Dashboard;
