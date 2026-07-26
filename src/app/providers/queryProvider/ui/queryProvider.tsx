import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/** Свойства компонента {@link QueryProvider}. */
interface QueryProviderProps {
    /** Дочернее дерево, оборачиваемое в провайдер TanStack Query. */
    children: ReactNode;
}

/**
 * Создаёт клиент TanStack Query с отключённым повторным запросом данных
 * при возвращении фокуса на окно браузера (`refetchOnWindowFocus`).
 */
function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } }
    });
}

/**
 * Провайдер TanStack Query.
 *
 * Оборачивает дерево приложения в {@link QueryClientProvider}. Клиент
 * создаётся через `useState`, а не на уровне модуля: при каждом монтировании
 * компонента создаётся новый `QueryClient`, а при последующих рендерах
 * используется тот же экземпляр.
 */
export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(createQueryClient);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
