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
    },{
        onError: (ctx) => {
      if (ctx.error.status === 403) {
        alert("Please verify your email address");
      }
      alert(ctx.error.message);
    },
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

export const signInWithPhone = async (phoneNumber: string, password: string, rememberMe: boolean) => {
  try {
    const { data, error } = await authClient.signIn.phoneNumber({
      phoneNumber,
      password,
      rememberMe
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Sign in with phone error:", error);
    return { success: false, error: "Failed to send OTP" };
  }
};

export const sendPhoneOTP = async (phoneNumber: string) => {
  try {
    const { data, error } = await authClient.phoneNumber.sendOtp({
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

export const verifyPhoneOTP = async (phoneNumber: string, code: string, updatePhoneNumber: boolean) => {
  try {
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code,
      updatePhoneNumber,
    });
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Verify phone OTP error:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
};

// ============================================
// PASSWORD MANAGEMENT
// ============================================

export const resetPasswordWithPhone = async (otp: string, phoneNumber: string, newPassword: string) => {
  try {
const { data, error } = await authClient.phoneNumber.resetPassword({
    otp,
    phoneNumber,
    newPassword,
});
  }
  catch (error) {
    console.error("Reset password with phone error:", error);
    return { success: false, error: "Failed to reset password" };
  }
};  

export const resetPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const { data, error } = await authClient.resetPassword({
      
      token,
      newPassword,
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

export const forgotPassword = async (email: string) => {
  try {
    const { data, error } = await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { success: false, error: "Failed to send reset email" };
  }
};

export const changePassword = async (currentPassword: string, newPassword: string, revokeOtherSessions?: boolean
) => {
    try {
    const { data, error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
    });
}    catch (error) {
    console.error("Change password error:", error);
    return { success: false, error: "Failed to change password" };
  } 
}

// ============================================
// EMAIL VERIFICATION
// ============================================

export const resendVerificationEmail = async (email: string) => {
  try {
    const { data, error } = await authClient.sendVerificationEmail({
      email,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Resend verification error:", error);
    return { success: false, error: "Failed to resend verification email" };
  }
};

export const verifyEmail = async (email: string, callbackURL: string) => {
  try {
    const { data, error } = await authClient.sendVerificationEmail({
      email,
      callbackURL,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Verify email error:", error);
    return { success: false, error: "Failed to verify email" };
  }
};

// ============================================
// SESSION MANAGEMENT
// ============================================

export const signOut = async () => {
  try {
    await authClient.signOut();
    redirect("/login");
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: "Failed to sign out" };
  }
};

export const getSession = async () => {
  try {
    const { data } = await authClient.getSession();
    return { success: true, session: data };
  } catch (error) {
    console.error("Get session error:", error);
    return { success: false, session: null };
  }
};