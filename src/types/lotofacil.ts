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
  [key: string]: any; // Para outros campos que possam existir
}