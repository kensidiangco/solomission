import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

export function usePouchLogInventory() {
    const { data, error, isLoading, mutate } = useSWR('outlog/', fetcher);
    console.log(data)
    return {
        items: Array.isArray(data) ? data : [],
        isLoading,
        isError: error,
        mutate,
    };
}
