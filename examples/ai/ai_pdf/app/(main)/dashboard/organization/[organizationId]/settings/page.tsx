import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import { SubscriptionButton } from "./_components/subscription_button";
import { checkSubscription } from "@/lib/subscription";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  // configureNile(cookies().get("authData"), null);
  // console.log("showing tenants page for user: " + nile.userId);
  // if (!nile.userId) {
  //   redirect("/login");
  // }
  // const userInfo = await nile.db("users.users").where({
  //   id: nile.userId,
  // });
  // console.log(userInfo);
  const isPro = await checkSubscription();
  return (
    <>
      <div className="mt-10">
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  );
};

export default page;
