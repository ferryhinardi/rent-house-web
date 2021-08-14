// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import '../../sentry.server.config';

type Data = {
  name: string
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  throw new Error("API throw error test");
  res.status(200).json({ name: 'John Doe' })
}

export default withSentry(handler)
