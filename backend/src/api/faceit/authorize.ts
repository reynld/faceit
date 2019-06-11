import { IncomingMessage, ServerResponse } from 'http';
import getAuthUrl from '../../utils/faceit/get-faceit-auth-url';
import { AUTH_COOKIE_NAME } from '../../constants';
import cookie from 'cookie';

/**
 * Handles a Faceit authorization request generating a state and writing
 * context information to a cookie to later redirect to the Discord
 * authorization URL to complete the flow.
 */
export default function authorize(req: IncomingMessage, res: ServerResponse) {
    console.log("REQ", req.statusCode);
    const state = `state_${Math.random()}`;
    const redirectUrl = getAuthUrl(state);

    const context = {
		state
    };
    
    // 302 Redirect Status Code, Redirecting to redirectURL
	res.writeHead(302, {
		Location: redirectUrl,
		'Set-Cookie': cookie.serialize(
			AUTH_COOKIE_NAME,
			JSON.stringify(context),
			{ path: '/' }
		)
	});

	res.end('Redirecting...');
}