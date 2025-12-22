import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d", // ✅ FIXED
    }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // CSRF protection
  });
};

export default generateTokenAndSetCookie;
