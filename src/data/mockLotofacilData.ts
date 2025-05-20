import type { LotofacilResult } from "@/types/lotofacil";

export const mockLotofacilData: LotofacilResult = {
  numero: 2999, // Use um número fictício ou o último conhecido
  dataApuracao: "2023-09-20T00:00:00", // Use uma data fictícia ou a última conhecida
  dezenasSorteadasOrdemSorteio: ["01", "03", "04", "05", "06", "09", "12", "13", "14", "17", "18", "20", "22", "24", "25"],
  dezenas: ["01", "03", "04", "05", "06", "09", "12", "13", "14", "17", "18", "20", "22", "24", "25"],
  rateioProcessado: true,
  acumulado: false,
  valorAcumulado: 0,
  estimativa: 1700000, // 1.7 milhões
  acumuladaProxConcurso: 0,
  premiacoes: [
    {
      faixa: 1,
      numeroDeGanhadores: 2,
      valorPremio: 654375.25,
      descricaoFaixa: "15 acertos"
    },
    {
      faixa: 2,
      numeroDeGanhadores: 243,
      valorPremio: 1617.72,
      descricaoFaixa: "14 acertos"
    },
    {
      faixa: 3,
      numeroDeGanhadores: 8739,
      valorPremio: 25.00,
      descricaoFaixa: "13 acertos"
    },
    {
      faixa: 4,
      numeroDeGanhadores: 98690,
      valorPremio: 10.00,
      descricaoFaixa: "12 acertos"
    },
    {
      faixa: 5,
      numeroDeGanhadores: 546285,
      valorPremio: 5.00,
      descricaoFaixa: "11 acertos"
    }
  ]
};

// Função para verificar se os dados são muito antigos (mais de 3 dias)
export function isDataTooOld(data: LotofacilResult): boolean {
  const dataApuracao = new Date(data.dataApuracao);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dataApuracao.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 3;
}

// Você pode adicionar funções auxiliares para manipular os dados mockados 
// ou para buscar dados de um arquivo JSON local
export function getLocalData(): LotofacilResult | null {
  // Em um ambiente real, isso poderia ler de um arquivo JSON local
  try {
    // Se estiver no servidor, poderia ler de um arquivo
    // Se estiver no cliente, poderia ler do localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lotofacil-data') : null;
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar dados locais:', error);
    return null;
  }
}

// Escrever dados para armazenamento local
export function saveLocalData(data: LotofacilResult): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lotofacil-data', JSON.stringify(data));
    }
    // No servidor, poderia escrever em um arquivo
  } catch (error) {
    console.error('Erro ao salvar dados locais:', error);
  }
}