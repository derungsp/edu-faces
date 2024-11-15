import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/dashboard` requires auth
      if (req.nextUrl.pathname === "/dashboard") {
        if (token) {
          return true;
        }
      }

      // only `/dashboard` requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/signin"],
};
