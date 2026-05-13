import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Basit bellek içi rate limiter (Vercel serverless ortamında sıfırlanabilir, ancak temel koruma sağlar)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 dakika

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text", placeholder: "admin" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Kullanıcı adı ve şifre gereklidir.");
        }

        const username = credentials.username;
        const now = Date.now();
        const attempt = loginAttempts.get(username);

        // Kilit kontrolü
        if (attempt && attempt.count >= MAX_ATTEMPTS) {
          if (now < attempt.lockedUntil) {
            const minutesLeft = Math.ceil((attempt.lockedUntil - now) / 60000);
            throw new Error(`Çok fazla deneme. Lütfen ${minutesLeft} dakika sonra tekrar deneyin.`);
          } else {
            // Süre dolmuşsa sıfırla
            loginAttempts.delete(username);
          }
        }

        // Çevre değişkenlerinden bilgileri al
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const rawHash = process.env.ADMIN_PASSWORD_HASH;

        // Vercel/Next.js .env okuyucularının $ işaretini değişken sanmaması için önek (prefix) kullanıyoruz
        const adminPasswordHash = rawHash ? rawHash.replace("Bcrypt_Prefix_", "$2b$10$") : undefined;

        if (!adminPasswordHash) {
          console.error("Sunucu yapılandırma hatası: ADMIN_PASSWORD_HASH eksik.");
          throw new Error("Sunucu tarafı yapılandırma hatası.");
        }

        if (username === adminUsername) {
          // bcrypt ile şifreleri karşılaştır
          const isPasswordValid = await bcrypt.compare(credentials.password, adminPasswordHash);

          if (isPasswordValid) {
            // Başarılı girişte denemeleri sıfırla
            loginAttempts.delete(username);
            return { id: "1", name: adminUsername };
          }
        }

        // Hatalı giriş
        const currentCount = loginAttempts.get(username)?.count || 0;
        const newCount = currentCount + 1;
        loginAttempts.set(username, {
          count: newCount,
          lockedUntil: newCount >= MAX_ATTEMPTS ? now + LOCKOUT_DURATION : 0,
        });

        throw new Error("Kullanıcı adı veya şifre hatalı.");
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Gün
  },
  secret: process.env.NEXTAUTH_SECRET,
};
