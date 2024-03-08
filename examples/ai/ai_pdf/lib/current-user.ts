import { cookies } from "next/headers";
import { configureNile } from "./AuthUtils";
import nile from "@/lib/NileServer";
import { redirect } from "next/navigation";

export const currentUser = async () => {
  configureNile(cookies().get("authData"), null);
  console.log("CurrentUser Lib File: " + nile.userId);
  if (!nile.userId) {
    redirect("/login");
  }
  const userInfo = await nile.db("users.users").where("id", "=", nile.userId);
  console.log(userInfo);
  if (!userInfo[0]) {
    return false;
  }
  return userInfo[0];
};
