"use client";

import { toast } from "sonner";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { redirect, useRouter } from "next/navigation";
import { credentialsSignup } from "@/actions/signup";

const SignupForm = () => {
  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password || !name)
          return toast.error("Please provide all fields");

        const toastId = toast.loading("Signing up");

        try {
          await credentialsSignup(name, email, password);
        } catch (error) {
          return toast.error(String(error), { id: toastId });
        }

        toast.success("Login Successfull", { id: toastId });
        redirect("/login");
      }}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" placeholder="Name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="demo@gmail.com"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" placeholder="demo" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Button type="submit">Sign Up</Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
