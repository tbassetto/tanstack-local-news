import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Local News
          </Link>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
