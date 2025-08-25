import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

interface pouchOutLogItem {
    id: number
    pouch: string;
    getter: string;
    quantity: number;
    purpose: string;
    status: string;
    given: string;
    date_created: string;
}

export function usePouchOutLogInventory() {
    const { data, error, isLoading, mutate } = useSWR<pouchOutLogItem[]>('outlog/', fetcher);

    return {
        pouchOutLog: Array.isArray(data) ? data : [],
        isPouchLogLoading: isLoading,
        isPouchLogError: error,
        mutate,
    };
}

interface pouchItem {
    id: number;
    size: string;
    quantity: number;
    date_created: string;
    date_updated: string;
}

export function usePouchInventory() {
    const { data, error, isLoading, mutate } = useSWR<pouchItem[]>('/', fetcher);

    return {
        pouch: Array.isArray(data) ? data : [],
        isPouchLoading: isLoading,
        isPouchError: error,
        mutate,
    };
}

interface recentPouchLogs {
    id: number;
    getter: string;
    quantity: string;
    purpose: string;
    status: string;
    given: string;
    date_created: string;
    pouch: string[];
}

export function useRecentPouchLogs() {
    const { data, error, isLoading, mutate } = useSWR<recentPouchLogs[]>('latestlog/', fetcher);

    return {
        recentPouch: Array.isArray(data) ? data : [],
        isRecentPouchLoading: isLoading,
        isRecentPouchError: error,
        mutate,
    };
}