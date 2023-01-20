// I prefer to put these sort of things in a layout to leave _app as simple and basic as possible.
// Makes changing the functionality/logic as easy as creating a new layout
import { ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import Loader from "./loader";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  // Work around to find if getServerSideProps is running.
  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className="h-full w-full min-h-screen min-w-screen bg-slate-150">
      {loading ? <Loader /> : <div>{children}</div>}
    </div>
  );
};
export default MainLayout;
