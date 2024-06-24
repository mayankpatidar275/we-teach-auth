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

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome,</CardTitle>
          <CardDescription>Login to the world of learnings...</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="submit">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="demo" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="demo@gmail.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Login</Button>
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

          <Link href="/signup">Don&apos;t have an account? Signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
