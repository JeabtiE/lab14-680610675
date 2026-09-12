import { useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

const STORAGE_KEY = "registrants";

export default function DashboardPage() {
  const [registrants] = useState<Registrant[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Registrant[]) : [];
  });

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      {registrants.length === 0 ? (
        <p className="text-secondary-emphasis">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        <>
          <p className="text-secondary">
            ผู้ลงทะเบียนแล้ว ({registrants.length} คน)
          </p>
          {registrants.map((registrant) => (
            <UserRegisterCard key={registrant.id} registrant={registrant} />
          ))}
        </>
      )}
    </div>
  );
}
