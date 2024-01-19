import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute('/about').createRoute({
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>
}