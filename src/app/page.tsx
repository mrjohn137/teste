import React from "react";
const api_url: string | undefined = process.env.NEXT_PUBLIC_API;

export interface PostsProps {
  numero: string
}
async function getPosts() {
  const res = await fetch(api_url as string);
  return res.json();
}

const post: PostsProps = await getPosts();

export default async function PostsPage() {
  return (
    <main>
      <h1>Posts archive</h1>
      <ol>
        <li key={post.numero}>{post.numero}</li>
      </ol>
    </main>
  );
}