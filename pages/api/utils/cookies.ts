import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse, NextApiHandler, NextApiRequest } from 'next';

export interface NextResponse extends NextApiResponse {
  cookie(name: string, value: string, options?: CookieSerializeOptions): void
}

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge!)
    options.maxAge! /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const withCookies = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  (res as NextResponse).cookie =
    (name: string, value: unknown, options: CookieSerializeOptions = {}) =>
    setCookie(res, name, value, options);

  return handler(req, res);
}

export default withCookies;