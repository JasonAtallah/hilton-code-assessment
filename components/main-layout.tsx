/*
I prefer to use a main layout for global configuration.
I could have just set the bg color on the body in the global css file but this makes it easier to change on other pages.
*/
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full min-h-screen min-w-screen bg-slate-150">
      {children}
    </div>
  );
}
