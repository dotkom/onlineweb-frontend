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
            scope: 'openid profile onlineweb4',
            params: { response_type: 'code'},
            accessTokenUrl: 'https://online.ntnu.no/openid/token',
            requestTokenUrl: '"https://online.ntnu.no/openid/authorize',
            authorizationUrl: 'https://online.ntnu.no/openid/authorize',
            profileUrl: 'https://online.ntnu.no/openid/userinfo',
            profile: (profile: Profile) => {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            },
            clientId: process.env.OW4_SSO_CLIENT_ID,
            clientSecret: process.env.OW4_SSO_CLIENT_SECRET,
            idToken: true,
        }
    ]
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);