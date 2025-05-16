export default async function Page() {
  const data = await fetch('https://teste-eta-azure.vercel.app/results/lotofacil')
  const posts = await data.json()

  console.log(posts);

  return (
    <ul>
      <li key={posts.numero}>{posts.numero}</li>
      <li key={posts.numero}>{posts.dataApuracao}</li>
    </ul>
  )
}