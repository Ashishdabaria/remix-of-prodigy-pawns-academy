import { Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPoster = pathname.startsWith("/poster");
  return (
    <div className="min-h-screen">
      {!isPoster && <Header />}
      <Outlet />
    </div>
  );
}
