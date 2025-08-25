'use client';

import { useParams } from "next/navigation";
import { usePouchById } from "@/hooks/usePouchInventory";

export default function PouchDetailPage() {
  const params = useParams(); // { id: "3" }
  const id = Number(params.id);

  const { pouch, isPouchLoading, isPouchError } = usePouchById(id);

  if (isPouchLoading) return <p>Loading...</p>;
  if (isPouchError) return <p>Error loading pouch</p>;
  if (!pouch) return <p>No pouch found</p>;

  return (
    <div>
      <h1>Update Pouch #{pouch.id}</h1>
      <p>Size: {pouch.size}</p>
      <p>Quantity: {pouch.quantity}</p>
      <p>Last Updated: {pouch.date_updated}</p>
    </div>
  );
}