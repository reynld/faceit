import { IncomingMessage, ServerResponse } from 'http';
import { send, json } from 'micro';

export default async function webhookHandler(
	req: IncomingMessage,
	res: ServerResponse
) {
	const event:any = await json(req);
	console.log('WEBHOOK HANDLER REQ\n', JSON.stringify(event));

    return send(res, 200);
}