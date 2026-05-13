import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Sadece /admin ve altındaki rotaları koru.
  // NextAuth otomatik olarak pages.signIn olarak tanımlanan /admin/login rotasını döngüye girmemesi için hariç tutar.
  matcher: ["/admin/:path*"],
};
