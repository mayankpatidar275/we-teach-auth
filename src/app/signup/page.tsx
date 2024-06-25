import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import { hash } from "bcrypt"; // causing issues
import SignupForm from "@/components/ui/client/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome,</CardTitle>
          <CardDescription>Signup to the world of learnings...</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
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
