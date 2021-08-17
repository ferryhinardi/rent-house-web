import { NextPageContext } from 'next';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie';
import { Login } from 'types';

export const login = ({ token }: Login) => {
  cookie.set('token', token, { expires: 1 })
  // Redirect to homepage
}

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/login' })
      ctx.res?.end()
    } else {
      // Redirect to login
    }
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  localStorage.setItem('logout', `${(new Date).getTime()}`)
  // Redirect to login
}
;