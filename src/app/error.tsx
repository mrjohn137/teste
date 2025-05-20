'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8 bg-red-50 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Algo deu errado!</h2>
      <p className="mb-4 text-red-700">{error.message || 'Ocorreu um erro inesperado'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}