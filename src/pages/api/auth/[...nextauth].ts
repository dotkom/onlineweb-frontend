import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth/client';
import { Profile } from 'oidc-client';

interface Token {
    name?: string,
    email?: string,
    picture?: string, // url to image
    accessToken?: string,
    iat: number,
    exp: number,
}

interface APISession extends Session {
    user: Session["user"] & {
        access_token?: string;
    }
}

interface Account {
    provider: string | null,
    type: string | null,
    id: number | null,
    refreshToken: string | null,
    accessToken: string | null,
    accessTokenExpires: null
}


const options = {
    callbacks: {
        session: async (session: APISession, token: Token): Promise<Session | APISession> => {
            if (token.accessToken) {
                session.user.access_token = token.accessToken;
            }
            return Promise.resolve(session)
        },
        jwt: async (token: Token, _: Token, account: Account) => {
            if (account && account.accessToken) {
                token.accessToken = account.accessToken;
            }
            return Promise.resolve(token)
    }
    },
    providers: [
        {
            id: 'onlineweb4',
            name: 'Onlineweb4',
            type: 'oauth',
            version: '2.0',
            scope: 'openid profile email onlineweb4',
            params: { 
                grant_type: 'authorization_code',
            },
            accessTokenUrl: 'https://online.ntnu.no/openid/token',
            requestTokenUrl: '"https://online.ntnu.no/openid/authorize',
            authorizationUrl: 'https://online.ntnu.no/openid/authorize?response_type=code',
            profileUrl: 'https://online.ntnu.no/openid/userinfo',
            profile: (profile: Profile) => {
                return {
                    ...profile,
                    id: profile.sub,
                    image: profile.picture,
                    email: profile.email,
                }
            },
            clientId: process.env.OW4_SSO_CLIENT_ID,
            clientSecret: process.env.OW4_SSO_CLIENT_SECRET,
            debug: true,
            idToken: false,
        }
    ]
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);