import { Suspense } from "react"

export default async function Home() {
  const data = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/')
  const results = await data.json()

  if (!results) {
    return <p>Carregando</p>
  }

  console.log(results);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {results.numero}
    </Suspense>
  );
}
