export interface Root {
  acumulado: boolean
  dataApuracao: string
  dataProximoConcurso: string
  dezenasSorteadasOrdemSorteio: string[]
  exibirDetalhamentoPorCidade: boolean
  id: number
  indicadorConcursoEspecial: number
  listaDezenas: string[]
  listaDezenasSegundoSorteio: string
  listaMunicipioUFGanhadores: string[]
  listaRateioPremio: ListaRateioPremio[]
  listaResultadoEquipeEsportiva: string
  localSorteio: string
  nomeMunicipioUFSorteio: string
  nomeTimeCoracaoMesSorte: string
  numero: number
  numeroConcursoAnterior: number
  numeroConcursoFinal_0_5: number
  numeroConcursoProximo: number
  numeroJogo: number
  observacao: string
  premiacaoContingencia: number
  tipoJogo: string
  tipoPublicacao: number
  ultimoConcurso: boolean
  valorArrecadado: number
  valorAcumuladoConcurso_0_5: number
  valorAcumuladoConcursoEspecial: number
  valorAcumuladoProximoConcurso: number
  valorEstimadoProximoConcurso: number
  valorSaldoReservaGarantidora: number
  valorTotalPremioFaixaUm: number
}

export interface ListaRateioPremio {
  descricaoFaixa: string
  faixa: number
  numeroDeGanhadores: number
  valorPremio: number
}

async function getData() {
  const res = await fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/`,
    {
      cache: 'no-store',
      next: { revalidate: 60 }
    }
  )

  return res.json()
}



export default async function Page() {
  const data: Root = await getData()
  if (!data) {
    return <p>Carregando...</p>
  }
  return (
    <>
      <h1>Home</h1>
      <h2>{data.numero}</h2>
    </>
  )
}
