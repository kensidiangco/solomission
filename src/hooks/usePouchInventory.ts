import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

export function usePouchInventory() {
    const { data, error, isLoading, mutate } = useSWR('/', fetcher);
    console.log(data)
    return {
        items: Array.isArray(data) ? data : [],
        isLoading,
        isError: error,
        mutate,
    };
}
