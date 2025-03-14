import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
  name?: string;
  email?: string;
  [key: string]: any;
}

export function decodeJWT(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token);

    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function extractUserInfo(token: string): {
  id?: string;
  name?: string;
  email?: string;
} {
  const decoded = decodeJWT(token);

  if (!decoded) return {};

  return {
    name: decoded.name,
    email: decoded.email,
    ...decoded,
  };
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);

  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);

  return decoded.exp < currentTime;
}

export function getTokenExpiryTime(token: string): Date | null {
  const decoded = decodeJWT(token);

  if (!decoded || !decoded.exp) return null;

  return new Date(decoded.exp * 1000);
}
