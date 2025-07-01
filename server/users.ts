"use server";
import { auth } from "@/lib/auth"
import { createAuthClient } from "better-auth/client"
const authClient =  createAuthClient()
 
const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "user@email.com",
            password: "password",
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "user@email.com",
            password: "password",
            name: "user",
        }
    })
}

export default signIn

export const signInWithProvider = async (provider: string) => {
    const data = await authClient.signIn.social({
        provider
    })
}
