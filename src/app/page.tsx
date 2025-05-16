import React from "react";

export interface PostsProps {
  numero: string
}
async function getPosts() {
  const res = await fetch("https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/");
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