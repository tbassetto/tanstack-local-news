import ky from "ky";

const api = ky.create({ prefixUrl: "https://jsonplaceholder.typicode.com/" });

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}
export const fetchUsers = () => api("users").json<User[]>();

interface FetchPostsOptions {
  userIds?: number[];
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export const fetchPosts = async (options: FetchPostsOptions = {}) => {
  if (!options.userIds || options.userIds.length === 0) {
    return api("posts").json<Post[]>();
  }
  const promises = options.userIds.map((id) => api(`posts?userId=${id}`).json<Post[]>());
  const result = (await Promise.all(promises)).flatMap((posts) => posts);
  return result
};

export const fetchPost = (id: number) => api(`posts/${id}`).json<Post>();
