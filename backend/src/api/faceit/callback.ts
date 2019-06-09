import { IncomingMessage, ServerResponse } from 'http';


/**
 * Handles a Faceit authorization request generating a state and writing
 * context information to a cookie to later redirect to the Discord
 * authorization URL to complete the flow.
 */
export default function callback(req: IncomingMessage, res: ServerResponse) {
    console.log('CALLBACK REQ', req);
	res.end('Redirecting...');
	return null;
}