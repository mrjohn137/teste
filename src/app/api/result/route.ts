import { NextResponse } from 'next/server';

export interface LotofacilResult {
  numero: number;
  dataApuracao: string;
  dezenasSorteadasOrdemSorteio: string[];
  dezenas: string[];
  rateioProcessado: boolean;
  acumulado: boolean;
  valorAcumulado: number;
  estimativa: number;
  acumuladaProxConcurso: number;
  premiacoes: {
    faixa: number;
    numeroDeGanhadores: number;
    valorPremio: number;
    descricaoFaixa: string;
  }[];
}


// Interface para os dados retornados para diferentes concursos
export interface ConcursoResponse {
  atual: LotofacilResult | null;
  anterior: LotofacilResult | null;
}

// Função para verificar se já é hora de um novo concurso
// Os sorteios geralmente ocorrem às segundas, quartas e sextas, às 20h
function isNewDrawTime(): boolean {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = domingo, 1 = segunda, 3 = quarta, 5 = sexta
  
  // Após às 20h nos dias de sorteio
  return (currentHour >= 20 && (currentDay === 1 || currentDay === 3 || currentDay === 5));
}

export async function getLotofacilData(): Promise<LotofacilResult> {
  try {
    const response = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://loterias.caixa.gov.br/',
      },
      // Usando cache com revalidação diária (86400 segundos = 24 horas)
      next: { 
        revalidate: 86400,
        // Também podemos forçar a revalidação em momentos específicos, como às 20h (quando geralmente saem os resultados)
        tags: ['lotofacil']
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error: unknown) {
    console.error('Erro ao buscar dados da Lotofacil:', error);
    throw error;
  }
}
// API para buscar resultados da Lotofacil
export async function GET() {
  try {
    // Verificamos se é hora de forçar uma revalidação
    const shouldRevalidate = isNewDrawTime();
    
    // Opções para o fetch
    const options: RequestInit = {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://loterias.caixa.gov.br/',
      },
      next: { 
        tags: ['lotofacil'],
        // Se for hora de sorteio, definimos um tempo curto de revalidação
        revalidate: shouldRevalidate ? 300 : 86400 // 5 minutos ou 24 horas
      }
    };

    // Buscar concurso atual
    const concursoAtual = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/', options)
      .then(res => res.ok ? res.json() : null);
    
    // Buscar concurso anterior (se existente e se a API suportar)
    // Nota: A API pública da Caixa pode não ter este endpoint
    let concursoAnterior = null;
    if (concursoAtual && concursoAtual.numero > 1) {
      try {
        // Este endpoint é hipotético - a API da Caixa pode não oferecer essa funcionalidade
        const numeroAnterior = concursoAtual.numero - 1;
        concursoAnterior = await fetch(`https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${numeroAnterior}`, options)
          .then(res => res.ok ? res.json() : null)
          .catch(() => null);
      } catch (error: unknown) {
        // Silenciosamente falha se o concurso anterior não estiver disponível
        console.log(error);
        console.log(`Concurso anterior não disponível`);
      }
    }

    // Retornar ambos os concursos
    return NextResponse.json({ 
      atual: concursoAtual,
      anterior: concursoAnterior
    });
  } catch (error: unknown) {
    console.error('Erro ao buscar dados da Lotofacil:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados da Lotofacil' },
      { status: 500 }
    );
  }
}