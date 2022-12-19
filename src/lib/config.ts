const secret = process.env.SECRET_COOKIE_PASSWORD

if (!secret) {
  throw new Error("SECRET_COOKIE_PASSWORD must be defined")
}

const ironOptions = {
  cookieName: "pole",
  password: secret,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}
export { ironOptions }
export default ironOptions
