import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      message: "Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
});
