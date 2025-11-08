"use server";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

// ============================================
// EMAIL/PASSWORD AUTHENTICATION
// ============================================

export const signIn = async (email: string, password: string) => {
  try {
    const result = await authClient.signIn.email({
        email,
        password,
    });

    if (result.data?.user) {
      redirect("/dashboard");
    }

    return { success: true, user: result.data?.user };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: "Invalid credentials" };
  }
};

export const signUp = async (email: string, password: string, name?: string) => {
  try{
    const result = await authClient.signUp.email({
        email,
        password,
        name: name||"user",
    });
    return { success: true, user: result.data?.user };
    }

    catch(error){
        console.error("Sign up error:", error);
        return { success: false, error: "Failed to create account" };
    }
};

// ============================================
// SOCIAL AUTHENTICATION
// ============================================

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

// ============================================
// ANONYMOUS AUTHENTICATION
// ============================================

export const signInAnonymously = async () => {
    try{
        const result = await authClient.signIn.anonymous();
        return { success: true, data: result.data };
    }
    catch(error){
            console.error("Anonymous sign in error:", error);
    return { success: false, error: "Failed to sign in anonymously" };
    }
};

// ============================================
// EMAIL OTP AUTHENTICATION
// ============================================

export const sendEmailOTP = async (email: string) => {
  try {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Send OTP error:", error);
    return { success: false, error: "Failed to send OTP" };
  }
};  

export const verifyEmailOTP = async (email: string, otp: string) => {
  try {
    const { data, error } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
};

// ============================================
// PHONE NUMBER AUTHENTICATION
// ============================================

export const sendPhoneOTP = async (phoneNumber: string) => {
  try {
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Send phone OTP error:", error);
    return { success: false, error: "Failed to send OTP" };
  }
};



export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  try {
    const { data, error } = await authClient.emailOtp.resetPassword({
      email,
      otp,
      password,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Reset password error:", error);
    return { success: false, error: "Failed to reset password" };
  }
}