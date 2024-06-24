import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { User } from "@/models/userModel";
// import { hash } from "bcrypt"; // causing issues
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/utils";

const SignupPage = () => {
  const signUp = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password) {
      throw new Error("Please provide all fields");
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, hashedPassword });

    redirect("/login");
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome,</CardTitle>
          <CardDescription>Signup to the world of learnings...</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUp}>
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
        </CardContent>
        <CardFooter className="flex justify-between flex-col gap-4">
          <span>or</span>

          <form action="">
            <Button type="submit" variant="outline">
              Login with google
            </Button>
          </form>

          <Link href="/signup">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
