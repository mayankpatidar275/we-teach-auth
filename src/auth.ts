import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google" 
import CredentialProvider from "next-auth/providers/credentials"
import { User } from "./models/userModel";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    CredentialProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials ) {
          const email = credentials.email as string | undefined;
          const password = credentials.password as string | undefined;

          if(!email || !password) throw new CredentialsSignin("Please provide both email and password");

          //connection to db

          const user = await User.findOne({email}).select("+password");

          if(!user) { throw new CredentialsSignin("Invailid email or password");}
 
          if(!user.password) { throw new CredentialsSignin("Invailid email or password");}
          
          const isPasswordCorrect = await  bcrypt.compare(password, user.password);

          if(!isPasswordCorrect)  { throw new CredentialsSignin("Invailid email or password");}

          // Todo: add more complexity like verified (send email to verify)

          return {name:user.name, email: user.email, id: user._id} // better not to send user directly because it has password
        },
      }),
  ],
})