import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from 'oidc-client';

const options = {
    providers: [
        {
            id: 'Onlineweb4',
            name: 'Onlineweb4',
            type: 'oauth',
            version: '2.0',
            scope: 'openid onlineweb4',
            params: { 
                grant_type: 'authorization_code',
            },
            accessTokenUrl: 'https://online.ntnu.no/openid/token',
            requestTokenUrl: '"https://online.ntnu.no/openid/authorize',
            authorizationUrl: 'https://online.ntnu.no/openid/authorize?response_type=code',
            profileUrl: 'https://online.ntnu.no/openid/userinfo',
            profile: (profile: Profile) => {
                console.log("profile", profile);
                // https://next-auth.js.org/configuration/options#jwt-helpers
                return {
                    id: profile.sub,
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