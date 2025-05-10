import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock user data
const users = [
  { username: "admin", password: "1234", isAdmin: true },
  { username: "user", password: "abcd", isAdmin: false },
];

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

export default function VendingMachine() {
  const [state, setState] = useState<State>("IDLE");
  const [credit, setCredit] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [change, setChange] = useState(0);
  const [items, setItems] = useState<Item[]>([ 
    { name: "Coke", price: 20, stock: 2 },
    { name: "Water", price: 10, stock: 2 },
    { name: "Snack", price: 15, stock: 2 },
  ]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<{ username: string; isAdmin: boolean } | null>(null);
  const [history, setHistory] = useState<{ item: string; price: number; time: string }[]>([]);

  const [newItem, setNewItem] = useState({ name: "", price: 0, stock: 0 });

  const login = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) setCurrentUser({ username: user.username, isAdmin: user.isAdmin });
    else alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  const insertCoin = (amount: number) => {
    setCredit((prev) => prev + amount);
    if (state === "IDLE") setState("WAITING_FOR_SELECTION");
  };

  const cancelAndRefund = () => {
    setChange(credit);
    setCredit(0);
    setSelectedItem(null);
    setState("GIVING_CHANGE");
    setTimeout(() => {
      setChange(0);
      setState("IDLE");
    }, 2000);
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

    setItems((prevItems) =>
      prevItems.map((i) =>
        i.name === item.name ? { ...i, stock: i.stock - 1 } : i
      )
    );

    setHistory((prev) => [...prev, {
      item: item.name,
      price: item.price,
      time: new Date().toLocaleString()
    }]);

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

  const addItem = () => {
    if (!newItem.name || newItem.price <= 0 || newItem.stock < 0) {
      alert("กรอกข้อมูลสินค้าให้ถูกต้อง");
      return;
    }
    setItems([...items, newItem]);
    setNewItem({ name: "", price: 0, stock: 0 });
  };

  if (!currentUser) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h2>
          <input placeholder="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2 w-full border p-2" />
          <input placeholder="รหัสผ่าน" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 w-full border p-2" />
          <Button onClick={login}>เข้าสู่ระบบ</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4 shadow-xl rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Vending Machine</h2>
        <p className="mb-2">ยินดีต้อนรับ: <strong>{currentUser.username}</strong></p>
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

        {credit > 0 && (
          <Button variant="destructive" className="mb-4" onClick={cancelAndRefund}>
            ยกเลิก/คืนเงิน
          </Button>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4">
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

        {currentUser.isAdmin && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">เพิ่มสินค้าใหม่</h3>
            <input className="border p-1 mb-1 w-full" placeholder="ชื่อสินค้า" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <input className="border p-1 mb-1 w-full" placeholder="ราคา" type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} />
            <input className="border p-1 mb-1 w-full" placeholder="จำนวน" type="number" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: Number(e.target.value) })} />
            <Button onClick={addItem}>เพิ่มสินค้า</Button>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-bold mb-2">ประวัติการซื้อ</h3>
          <ul className="text-sm space-y-1">
            {history.map((h, index) => (
              <li key={index}>[{h.time}] {h.item} - {h.price} บาท</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
