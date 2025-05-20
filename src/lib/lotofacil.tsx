import type { LotofacilResult } from "@/types/lotofacil";

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
  } catch (error) {
    console.error('Erro ao buscar dados da Lotofacil:', error);
    throw error;
  }
}