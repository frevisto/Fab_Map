import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  max: 40, 
  message: "Você excedeu o limite de requisições. Tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});


module.exports = limiter;
