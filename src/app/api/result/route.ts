// src/app/api/lotofacil/route.ts
import { NextResponse } from 'next/server';
import https from 'https';

// Função que usa um agente HTTPS personalizado para ignorar verificações SSL se necessário
function fetchWithAgent(url: string, headers: Record<string, string>) {
  return new Promise<string>((resolve, reject) => {
    // Configurando um agente HTTPS com opções específicas
    const agent = new https.Agent({
      rejectUnauthorized: false // Apenas use isso em ambiente de desenvolvimento!
    });

    const options = {
      headers,
      agent
    };

    https.get(url, options, (res) => {
      let data = '';
      
      // A resposta foi dividida em chunks: recolha os dados
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // A resposta completa foi recebida
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Status code: ${res.statusCode}, Message: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

export async function GET() {
  try {
    // Headers completos simulando um navegador real
    const headers = {
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
    };

    let responseData: string;
    
    try {
      // Tentativa 1: Usando fetch padrão
      const response = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/', {
        headers,
        next: { 
          revalidate: 86400,
          tags: ['lotofacil'] 
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro na primeira tentativa: ${response.status}`);
      }
      
      responseData = await response.text();
    } catch (error) {
      console.log('Primeira tentativa falhou, tentando com agente personalizado');
      console.log(error);
      // Tentativa 2: Usando agente HTTPS personalizado
      responseData = await fetchWithAgent(
        'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/',
        headers
      );
    }

    // Armazenar os dados em cache
    // Aqui você pode implementar seu próprio armazenamento em cache (Redis, banco de dados, etc.)
    
    try {
      const data = JSON.parse(responseData);
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
        }
      });
    } catch (parseError) {
      console.error('Erro ao analisar JSON:', parseError);
      // Retornamos o texto bruto com status 200 se não conseguir parsear JSON
      return new NextResponse(responseData, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, s-maxage=86400'
        }
      });
    }
  } catch (error) {
    console.error('Erro ao buscar dados da Lotofacil:', error);
    
    // Relatório detalhado de erro
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(
      { error: 'Erro ao buscar dados da Lotofacil', details: errorDetails },
      { status: 500 }
    );
  }
}