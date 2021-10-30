import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import cookie from 'js-cookie';
import { AxiosError } from 'axios';
import { fetchServer } from 'core';
import { Login, User } from 'types';

export const login = ({ token }: Login) => {
  cookie.set('token', token, { expires: 1 });
};

export const redirectIfUnauthenticated = async ({
  req,
  res,
  pathname,
}: NextPageContext) => {
  if (!Boolean((req as NextApiRequest)?.cookies?.token)) {
    return null;
  }
console.log('token....', (req as NextApiRequest)?.cookies?.token);
  try {
    const user = await fetchServer<User>(
      req as NextApiRequest,
      res as NextApiResponse,
      {
        url: '/current-user/',
      }
    );
    return user;
  } catch (err) {
    if ((err as AxiosError).response?.status == 401 && pathname !== undefined) {
      return null;
    }

    return undefined;
  }
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  localStorage.setItem('logout', `${new Date().getTime()}`);
  // Redirect to login
};
