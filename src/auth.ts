import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models/userModel";
import { connectToDatabase } from "./lib/utils";
// import { compare } from "bcrypt"; // causing issues

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          // throw new CredentialsSignin("Please provide both email and password");
        {
          console.log("Please provide both email and password");
        return {error: "Please provide both email and password"}
      }

        //connection to db
        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password");

        console.log("user: ", user);

        if (!user) {
          // throw new CredentialsSignin("Invailid email or password");
          return {error: "Invailid email or password"}
          // return null
        }

        if (!user.password) {
          // throw new CredentialsSignin("Invailid email or password");
          return {error: "Invailid email or password"}
          // return null
        }

        const bcrypt = require("bcrypt");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          // throw new CredentialsSignin("Invailid email or password");
          // return null
          return {error: "Invailid email or password"}
        }

        // Todo: add more complexity like verified (send email to verify)

        return { name: user.name, email: user.email, id: user._id }; // better not to send user directly because it has password
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    // signIn: async ({ user, account }) => {
    //   if (account?.provider === "google") {
    //     try {
    //       const { email, name, image, id } = user;
    //       await connectToDatabase();
    //       const alreadyUser = await User.findOne({ email });
    //       if (!alreadyUser)
    //         await User.create({ email, name, image, googleId: id });
    //       return true;
    //     } catch (error) {
    //       throw new AuthError("Error while creating user");
    //     }
    //   }
    //   if (account?.provider === "credentials") return true;
    //   return false;
    // },
  },
});
