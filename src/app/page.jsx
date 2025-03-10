import Navbar from "@/components/Navbar";
import LandingPage from "./landingpage/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <LandingPage />
      </body>
    </html>
  );
}
