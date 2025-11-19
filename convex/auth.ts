import { betterAuth } from "better-auth";
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { nextCookies } from "better-auth/next-js";
import { convex } from "@convex-dev/better-auth/plugins";
import { DataModel } from "./_generated/dataModel";
import { components } from "./_generated/api";
import { sendEmail } from "./email";

const siteUrl = process.env.SITE_URL!;

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  return betterAuth({
  logger: {
    disabled: optionsOnly,
  },
  baseURL: siteUrl,
  
  database: authComponent.adapter(ctx),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url, token}, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
   emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "github", "discord", "google"],
      allowDifferentEmails: true,
      allowUnlinkingAll: true,
      updateUserInfoOnLink: true,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  plugins: [
    convex(),
    // phoneNumber({
    //   sendOTP: ({ phoneNumber, code }) => {
    //     // Implement sending OTP code via SMS
    //     console.log(`Sending SMS OTP ${code} to ${phoneNumber}`);
    //   },
    //   otpLength: 6,
    //   expiresIn: 600,
    //   signUpOnVerification: {
    //             getTempEmail: (phoneNumber) => {
    //                 return `${phoneNumber}@my-site.com`
    //             },
                
    //         }
    // }),
    // twoFactor(),
    // anonymous(),
    // emailOTP({
    //   async sendVerificationOTP({ email, otp }) {
    //     // Implement the sendVerificationOTP method to send the OTP to the user's email address
    //     console.log(`Sending email OTP ${otp} to ${email}`);
    //   },
    //   otpLength: 6,
    //   expiresIn: 600,
    // }),
    nextCookies(),
  ],
})
};

