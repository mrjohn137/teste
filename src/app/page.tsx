import { LotofacilResults } from "@/components/LotofacilResults";
import { getLotofacilData } from "@/lib/lotofacil";
import React from "react";

export default async function PostsPage() {

  try {
    const lotofacilData = await getLotofacilData();
    
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">Resultados da Lotofácil</h1>
        <div className="max-w-3xl mx-auto">
          <LotofacilResults data={lotofacilData} />
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
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Posts archive</h1>

      
    </main>
  );
}