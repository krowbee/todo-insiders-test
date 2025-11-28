import * as jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export class TokenService {
  generateAccessToken(email: string, id: number): string {
    const token = jwt.sign({ email, id }, secret, { expiresIn: "7d" });
    return token;
  }

  verifyAccessToken(token: string): { id: number; email: string } {
    const user = jwt.verify(token, secret) as { id: number; email: string };
    return user;
  }
}
