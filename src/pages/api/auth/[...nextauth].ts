import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from 'oidc-client';

const options = {
    providers: [
        {
            id: 'onlineweb4',
            name: 'Onlineweb4',
            type: 'oauth',
            version: '2.0',
            scope: 'openid profile onlineweb4',
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
                /*
                    Dette funker jo råbra, ikke sjekket om man faktisk får useren i frontend, men den logges her korrekt.
                    Problemet akkurat nå er at man får "Missing or invalid provider account" med oauth_callback_handler_error. 
                */
                return {
                    ...profile,
                    id: profile.sub,
                    image: profile.picture,
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