import type { Registrant } from "../libs/Registrant";

interface UserRegisterCardProps {
  registrant: Registrant;
}

export default function UserRegisterCard({
  registrant,
}: UserRegisterCardProps) {
  // registrant.gender === "male"   -> "👨 Male"
  // registrant.gender === "female" -> "👩 Female"
  const genderLabel = registrant.gender === "male" ? "👨 Male" : "👩 Female";

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h6 className="fw-bold text-dark mb-1">{registrant.fullName}</h6>
          <div className="small text-secondary mb-2">
            {registrant.plan} · {genderLabel}
          </div>
          <div className="d-flex flex-wrap gap-2">
            {registrant.items.map((item) => (
              <span key={item} className="badge border text-dark bg-light">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="fw-bold text-dark text-nowrap">
          {registrant.total.toLocaleString()} THB
        </div>
      </div>
    </div>
  );
}
