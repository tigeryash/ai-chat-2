import { createAuthClient } from "better-auth/react"
import { phoneNumberClient } from "better-auth/client/plugins"
import { anonymousClient } from "better-auth/client/plugins"
import { emailOTPClient } from "better-auth/client/plugins"
import { convexClient } from "@convex-dev/better-auth/client/plugins";



export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    plugins: [convexClient(),phoneNumberClient(),anonymousClient(),emailOTPClient()]
})