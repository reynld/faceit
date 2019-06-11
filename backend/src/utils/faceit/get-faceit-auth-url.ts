import { stringify } from 'querystring';

const { 
    FACEIT_CLIENT_ID, 
    // FACEIT_URL, 
    // FACEIT_API_KEY 
} = process.env;

export default function getFaceitAuthorizeUrl(state: string) {
	return `https://cdn.faceit.com/widgets/sso/index.html/?${stringify({
        response_type: "token",
        client_id: FACEIT_CLIENT_ID,
        // redirect_popup: true,
        // scope:"openid profile email",
		state,
		// redirect_uri: `${process.env.HOOK_URL}/callback`,
	})}`;
}
// http://localhost:9001/authorize