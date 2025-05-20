import { LotofacilResults } from '../components/LotofacilResults';
import { mockLotofacilData, getLocalData } from '../data/mockLotofacilData';

// Função modificada para buscar dados com várias estratégias de fallback
async function getLotofacilDataWithFallback() {
  try {
    // Tentativa 1: Usar nossa própria API proxy
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/lotofacil`, {
      next: { revalidate: 86400 }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    
    // Se a API proxy falhar, tentamos localData (se estiver no cliente)
    const localData = getLocalData();
    if (localData) {
      return localData;
    }
    
    // Por último, usamos dados mockados
    return mockLotofacilData;
  } catch (error) {
    console.error('Todas as estratégias de obtenção de dados falharam:', error);
    // Em último caso, usamos dados mockados
    return mockLotofacilData;
  }
}

export default async function Home() {
  try {
    const lotofacilData = await getLotofacilDataWithFallback();
    
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">Resultados da Lotofácil</h1>
        <div className="max-w-3xl mx-auto">
          <LotofacilResults data={lotofacilData} />
          
          {/* Aviso quando estamos usando dados mockados */}
          {lotofacilData === mockLotofacilData && (
            <div className="mt-4 p-3 bg-yellow-100 rounded text-center">
              <p className="text-yellow-800">
                Exibindo dados de exemplo. Não foi possível obter os resultados mais recentes.
              </p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">Resultados da Lotofácil</h1>
        <div className="max-w-3xl mx-auto p-4 bg-red-100 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-700">Erro ao carregar os dados</h2>
          <p className="text-red-700 mt-2">
            {error instanceof Error ? error.message : 'Ocorreu um erro desconhecido'}
          </p>
          
          <div className="mt-6 p-4 bg-white rounded">
            <h3 className="font-semibold">Dados de exemplo:</h3>
            <LotofacilResults data={mockLotofacilData} />
          </div>
        </div>
      </main>
    );
  }
}