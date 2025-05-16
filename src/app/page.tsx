export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog/1')
  const posts = await data.json()

  console.log(posts);

  return (
    <ul>
      <li key={posts.id}>{posts.title}</li>
    </ul>
  )
}