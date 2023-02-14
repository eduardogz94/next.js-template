/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";

import CacheProvider from "providers/CacheProvider";
import Header from "components/molecules/Header";
import Footer from "components/molecules/Footer";
import "styles/globals.css";

interface Props extends AppProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: any) => page);
  return (
    <>
      <Header />
      <CacheProvider>{getLayout(<Component {...pageProps} />)}</CacheProvider>
      <Footer />
    </>
  );
};

export default MyApp;
