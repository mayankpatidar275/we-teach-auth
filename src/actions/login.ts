"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email: string, password: string) => {


  // try {
    const res = await signIn("credentials", {
      // signIn doesnt work inside try catch, gives some redirect error.
      email,
      password,
      // redirect: false
      redirectTo: "/"
    });
    console.log("res: ", res)
    return res
    // if (res?.status == 200) {
    //   // push('/')
    //   console.log("success");
    //   return "Login success"
    // } else if(res?.error) {
    //   return res.error;
    // }
  // } catch (error) {
  //   console.log("error in login is: ", error);
  //   // const err = error as CredentialsSignin;
  //   // return err.message;
  // }
};

export { credentialsLogin };
