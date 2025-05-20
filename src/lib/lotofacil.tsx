import type { LotofacilResult } from "@/types/lotofacil";

export async function getLotofacilData(): Promise<LotofacilResult> {
  try {
    const response = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Connection': 'keep-alive',
        'Origin': 'https://loterias.caixa.gov.br',
        'Referer': 'https://loterias.caixa.gov.br/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
      // Usando cache com revalidação diária (86400 segundos = 24 horas)
      next: { 
        revalidate: 86400,
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