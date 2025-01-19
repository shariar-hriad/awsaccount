import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Extend the User type to include `id`
declare module 'next-auth' {
    interface User {
        id: number
    }

    interface Session {
        user: User // Ensure that the session always has a user object
    }
}

// Define the options with NextAuthOptions type
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null

                const { username, password } = credentials

                // Example user fetching logic
                const user = { id: 1, name: 'User', email: 'user@example.com' }
                // await connectDB()
                // const user = await User.find({email}).lean()

                if (username === 'user' && password === 'password') {
                    // If the credentials are valid, return the user object matching `User` type
                    return user
                } else {
                    // Return null if user data could not be retrieved
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
    },
    session: {
        strategy: 'jwt', // Use JSON Web Tokens for session management
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id // Set user ID in the token
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = session.user || ({} as User) // Ensure session.user is initialized
                session.user.id = token.id as number // Ensure type-safety for ID
            }
            return session
        },
    },
}

// Export the NextAuth handler with GET and POST methods
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
