import { LotofacilResult } from '../types/lotofacil';

interface LotofacilResultsProps {
  data: LotofacilResult;
}

export function LotofacilResults({ data }: LotofacilResultsProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Lotofácil - Concurso {data.numero}</h2>
      <p className="mb-2">Data: {new Date(data.dataApuracao).toLocaleDateString('pt-BR')}</p>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Dezenas Sorteadas</h3>
        <div className="flex flex-wrap gap-2">
          {data.dezenas.map((dezena) => (
            <div 
              key={dezena} 
              className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold"
            >
              {dezena}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Premiações</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Acertos</th>
              <th className="p-2 text-left">Ganhadores</th>
              <th className="p-2 text-left">Prêmio (R$)</th>
            </tr>
          </thead>
          <tbody>
            {data.premiacoes.map((premio) => (
              <tr key={premio.faixa} className="border-t">
                <td className="p-2">{premio.descricaoFaixa}</td>
                <td className="p-2">{premio.numeroDeGanhadores}</td>
                <td className="p-2">
                  {premio.valorPremio.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.acumulado && (
        <div className="p-3 bg-yellow-100 rounded-md mb-4">
          <p className="font-semibold">Acumulado para o próximo concurso: {data.acumuladaProxConcurso.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      )}
      
      <div className="mt-4">
        <p className="text-gray-600">Estimativa de prêmio do próximo concurso: {data.estimativa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    </div>
  );
}
