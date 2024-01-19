import { FileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  fetchPosts,
  fetchUsers
} from "../lib/api";
import { useTitle } from "hoofd";

type HomeSearch = {
  users?: string[];
  query?: string;
  sortBy?: SortBy;
};

const sortByOptions = ["alphabetical", "popularity", "relevance"];
type SortBy = (typeof sortByOptions)[number];
const isValidSortBy = (sortBy: unknown): sortBy is SortBy => {
  return typeof sortBy == "string" && sortByOptions.includes(sortBy);
};

export const Route = new FileRoute('/').createRoute({
  component: Home,
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    return {
      users: Array.isArray(search.users) ? search.users : [],
      query: typeof search.query == "string" ? search.query : undefined,
      sortBy: isValidSortBy(search.sort) ? search.sort : undefined,
    };
  },
  loaderDeps: ({ search: { users } }) => ({ users }),
  loader: async ({deps: {users}}) => {
    const userIds =  (users || []).map((id) => Number(id));
    return Promise.all([
      fetchPosts({ userIds }),
      fetchUsers(),
    ]);
  },
});
function Home() {
  const navigate = useNavigate();
  useTitle("Local News");
  const [posts, users] = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <div className="row mt-4">
      <div className="col-3">
        <h3>Filter by users</h3>
        {users.map((user) => {
          return (
            <div className="form-check" key={user.id}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={search.users?.includes(user.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    navigate({
                      to: Route.to,
                      search: {
                        users: [
                          ...(search.users || []),
                          user.id,
                        ],
                      },
                    });
                  } else {
                    navigate({
                      to: Route.to,
                      search: {
                        users: (search.users || []).filter(
                          (c) => c != user.id
                        ),
                      },
                    });
                  }
                }}
                id={user.id}
              />
              <label className="form-check-label" htmlFor={user.id}>
                {user.name} <span className="badge rounded-pill bg-light text-dark">#{user.id}</span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="col">
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to="/$slug" params={{ slug: String(post.id) }}>
                {post.title}
              </Link>
              <span className="badge rounded-pill bg-light text-dark">userId: {post.userId}</span>
            </li>
          ))}
        </ul>
        <p><em>TODO: add search input tied to the <code>query</code> search param.</em></p>
        <p><em>TODO: add pagination</em></p>
      </div>
    </div>
  );
}
