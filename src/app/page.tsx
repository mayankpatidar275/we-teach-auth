// import { auth } from "@/auth";
import { sessionUserId } from "@/actions/get-userId";

export default async function Home() {
  const userId = await sessionUserId();
  console.log("userId: ", userId);

  return <div></div>;
}
