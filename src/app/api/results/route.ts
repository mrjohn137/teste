export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return Response.json(res)
}