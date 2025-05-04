import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type State =
  | "IDLE"
  | "WAITING_FOR_SELECTION"
  | "WAITING_FOR_PAYMENT"
  | "DISPENSING_ITEM"
  | "GIVING_CHANGE"
  | "OUT_OF_STOCK";

type Item = {
  name: string;
  price: number;
  stock: number;
};

const items: Item[] = [
  { name: "Coke", price: 20, stock: 3 },
  { name: "Water", price: 10, stock: 2 },
  { name: "Snack", price: 15, stock: 0 },
];

export default function VendingMachine() {
  const [state, setState] = useState<State>("IDLE");
  const [credit, setCredit] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [change, setChange] = useState(0);

  const insertCoin = (amount: number) => {
    setCredit((prev) => prev + amount);
    if (state === "IDLE") setState("WAITING_FOR_SELECTION");
  };

  const selectItem = (item: Item) => {
    if (item.stock <= 0) {
      setState("OUT_OF_STOCK");
      return;
    }
    setSelectedItem(item);
    if (credit >= item.price) {
      dispenseItem(item);
    } else {
      setState("WAITING_FOR_PAYMENT");
    }
  };

  const dispenseItem = (item: Item) => {
    setState("DISPENSING_ITEM");
    const remainingCredit = credit - item.price;
    setTimeout(() => {
      setChange(remainingCredit);
      setCredit(0);
      setState("GIVING_CHANGE");
      setTimeout(() => {
        setSelectedItem(null);
        setChange(0);
        setState("IDLE");
      }, 2000);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4 shadow-xl rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Vending Machine</h2>
        <p className="mb-2">State: <strong>{state}</strong></p>
        <p className="mb-2">Credit: {credit} บาท</p>
        {selectedItem && <p className="mb-2">Selected: {selectedItem.name}</p>}
        {change > 0 && <p className="mb-2 text-green-600">Change: {change} บาท</p>}

        <div className="mb-4 space-x-2">
          <Button onClick={() => insertCoin(1)}>ใส่เหรียญ 1</Button>
          <Button onClick={() => insertCoin(2)}>ใส่เหรียญ 2</Button>
          <Button onClick={() => insertCoin(5)}>ใส่เหรียญ 5</Button>
          <Button onClick={() => insertCoin(10)}>ใส่เหรียญ 10</Button>

        </div>

        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <Button
              key={item.name}
              variant="outline"
              disabled={state === "DISPENSING_ITEM" || state === "GIVING_CHANGE"}
              onClick={() => selectItem(item)}
            >
              {item.name} ({item.price}) [{item.stock > 0 ? "มี" : "หมด"}]
            </Button>
          ))}
        </div>

        {state === "OUT_OF_STOCK" && (
          <p className="mt-4 text-red-600">สินค้าที่เลือกหมดแล้ว!</p>
        )}
      </CardContent>
    </Card>
  );
}
