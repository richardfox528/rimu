import { QueryClient } from '@tanstack/react-query';

// Crea una instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configura opciones globales para las queries si es necesario
      // por ejemplo, staleTime, cacheTime
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      refetchOnWindowFocus: false, // Opcional: deshabilita refetch al enfocar ventana
    },
  },
});

export default queryClient;