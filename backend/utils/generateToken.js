import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,        // 🔥 REQUIRED for HTTPS (Vercel)
    sameSite: "none",    // 🔥 REQUIRED for cross-site cookies
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export default generateTokenAndSetCookie;
