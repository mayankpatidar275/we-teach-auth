import { auth } from "@/auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const cookess = cookies().get("authjs.session-token");
  // console.log(cookess);
  // console.log(cookess?.value);
  // console.log(
  //   await decode({
  //     token: cookess?.value!,
  //     salt: cookess?.name!,
  //     secret: process.env.AUTH_SECRET!,
  //   })
  // );

  return <div></div>;
}
