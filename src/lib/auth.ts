import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface AuthPayload extends JWTPayload {
  userId: number;
  username: string;
}

export async function signToken(payload: { userId: number; username: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as AuthPayload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE = 'auth_token';
export const USER_COOKIE = 'auth_user';
