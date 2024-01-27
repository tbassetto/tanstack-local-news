import { createFileRoute } from "@tanstack/react-router";
import { useTitle } from "hoofd";
import { fetchPost } from "../lib/api";

export const Route = createFileRoute('/$slug')({
  component: Product,
  loader: ({ params }) => fetchPost(Number(params.slug)),
});

function Product() {
  const post = Route.useLoaderData();
  useTitle(post.title);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
