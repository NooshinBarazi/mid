import { NextRequest, NextResponse } from "next/server";
import store from "./redux/store";
import { refreshToken } from "./redux/features/auth/authSlice";

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get("token");
  const refreshCookie = request.cookies.get("refresh");

  const token = tokenCookie?.value;
  const refresh = refreshCookie?.value;

  if (!token || !refresh) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const response = await fetch(request.url, {
    headers: {
        'Authorization': `"Bearer ${token}"`,
    },
  });

  if(response.status === 401){
    try{
        const resultAction = await store.dispatch(refreshToken({ access: token, refresh }));
        if (refreshToken.fulfilled.match(resultAction)) {
          const newAccessToken = resultAction.payload.access;
          const newResponse = NextResponse.next();
          newResponse.cookies.set('token', newAccessToken);
          return newResponse;
        } else {
          throw new Error('Token refresh failed');
        }
    }catch(error){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*', '/protected/:path*', '/profile', '/editImage', '/addNews']
}
