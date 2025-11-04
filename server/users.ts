"use server";
import { createAuth } from "../convex/auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (result.user) {
      redirect("/dashboard");
    }

    return { success: true, user: result.user };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: "Invalid credentials" };
  }
};

export const signUp = async (email: string, password: string) => {
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: "user",
    },
  });
};

export const signInWithProvider = async (providerName: string) => {
  try {
    const data = await authClient.signIn.social({
      provider: providerName,
    });
    console.log(data);
    return { success: true, data };
  } catch (error) {
    console.error("Social sign in error:", error);
    return { success: false, error: "Failed to sign in with provider" };
  }
};

export const signInAnonymously = async () => {
  const data = await authClient.signIn.anonymous();
  console.log(data);
};

export const sendEmailOTP = async (email: string) => {
  const { data, error } = await authClient.emailOtp.sendVerificationOtp({
    email,
    type: "sign-in", // or "email-verification", "forget-password"
  });
  console.log(data);
};

export const emailOTPSignIn = async (email: string) => {
  const { data, error } = await authClient.emailOtp.sendVerificationOtp({
    email,
    type: "sign-in", // or "email-verification", "forget-password"
  });
  console.log(data);
};

export const verifyEmailOTP = async (email: string, otp: string) => {
  const { data, error } = await authClient.emailOtp.verifyEmail({
    email,
    otp,
  });
  console.log(data);
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  const { data, error } = await authClient.emailOtp.resetPassword({
    email,
    otp,
    password,
  });
  console.log(data);
};
