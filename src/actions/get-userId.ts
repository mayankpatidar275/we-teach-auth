import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const sessionUserId = async () => {
  const cookess = cookies().get("authjs.session-token");

  const sessionData = await decode({
    token: cookess?.value!,
    salt: cookess?.name!,
    secret: process.env.AUTH_SECRET!,
  });

  console.log("sessionData", sessionData);

  return sessionData?.email;
};
