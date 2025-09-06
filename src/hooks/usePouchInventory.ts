'use client';

import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

interface pouchOutboundLogItem {
    id: number
    pouch: string;
    getter: string;
    quantity: number;
    purpose: string;
    status: string;
    given: string;
    date_created: string;
}

export function usePouchOutboundInventory() {
    const { data, error, isLoading, mutate } = useSWR<pouchOutboundLogItem[]>('pouch/outbounded/', fetcher);

    return {
        pouchOutbound: Array.isArray(data) ? data : [],
        isPouchOutboundLoading: isLoading,
        isPouchOutboundError: error,
        mutate,
    };
}

interface pouchInboundItem {
    id: number
    pouch: string;
    getter: string;
    quantity: number;
    date_created: string;
}

export function usePouchInboundInventory() {
    const { data, error, isLoading, mutate } = useSWR<pouchInboundItem[]>('pouch/inbounded/', fetcher);

    return {
        pouchInbound: Array.isArray(data) ? data : [],
        isPouchInboundLoading: isLoading,
        isPouchInboundError: error,
        mutate,
    };
}

export function usePouchInboundById(id?: number) {
  // Only fetch if id is provided
  const { data, error, isLoading, mutate } = useSWR<pouchInboundItem>(
    id ? `pouch/inbounded/${id}/` : null,
    fetcher
  );

  return {
    inboundedPouch: data,
    isInboundedPouchLoading: isLoading,
    isInboundedPouchError: error,
    mutate,
  };
}

interface pouchItem {
    id: number;
    size: string;
    quantity: number;
    inbounded_quantity: number;
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

export function usePouchById(id?: number) {
  // Only fetch if id is provided
  const { data, error, isLoading, mutate } = useSWR<pouchItem>(
    id ? `pouch/${id}/` : null,
    fetcher
  );

  return {
    pouch: data,
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
    const { data, error, isLoading, mutate } = useSWR<recentPouchLogs[]>('pouch/recent/outbounded/', fetcher);

    return {
        recentPouch: Array.isArray(data) ? data : [],
        isRecentPouchLoading: isLoading,
        isRecentPouchError: error,
        mutate,
    };
}