import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber, anonymous, emailOTP } from "better-auth/plugins";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
        
    },
    account:{
        accountLinking:{
            enabled: true,
            trustedProviders: ["email-password"],
            allowDifferentEmails: true,
            allowUnlinkingAll: true,
            updateUserInfoOnLink: true,
        }
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
    plugins: [ phoneNumber({  
        sendOTP: ({ phoneNumber, code }, request) => { 
            // Implement sending OTP code via SMS
         } 
        }) ,
        anonymous(),
        emailOTP({ 
                async sendVerificationOTP({ email, otp, type}) { 
					// Implement the sendVerificationOTP method to send the OTP to the user's email address
				}, 
                otpLength: 6,
                expiresIn: 600,
                
        }) ,
        nextCookies()]  
});