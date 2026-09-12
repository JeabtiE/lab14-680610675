import { useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

const STORAGE_KEY = "registrants";

export default function DashboardPage() {
  // ---- ดึงข้อมูลผู้ลงทะเบียนทั้งหมดจาก LocalStorage ----
  const [registrants] = useState<Registrant[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Registrant[]) : [];
  });

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      {registrants.length === 0 ? (
        <p className="fw-bold text-secondary">ยังไม่มีผู้ลงทะเบียน</p>
      ) : (
        <>
          <p className="fw-bold text-primary">
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
