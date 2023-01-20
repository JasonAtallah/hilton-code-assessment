import "styles/global.css";
import type { AppProps } from "next/app";
import MainLayout from "../components/main-layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
