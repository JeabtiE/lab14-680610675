import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

const STORAGE_KEY = "registrants";

interface ModalRegisterProps {
  show: boolean;
  onClose: () => void;
}

export default function ModalRegister({ show, onClose }: ModalRegisterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    plan: false,
    gender: false,
  });

  const planPrice = plans.find((p) => p.id === plan)?.price ?? 0;
  const itemsPrice = extraItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  const hasDiscount = selectedItems.length === extraItems.length;
  const total = (planPrice + itemsPrice) * (hasDiscount ? 0.8 : 1);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setSelectedItems([]);
    setAgree(false);
    setErrors({
      firstName: false,
      lastName: false,
      plan: false,
      gender: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleRegister = () => {
    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      plan: plan === "",
      gender: gender === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    const registrant: Registrant = {
      id: Date.now(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      gender: gender,
      plan: plans.find((p) => p.id === plan)?.label ?? "-",
      extraItems: extraItems
        .filter((item) => selectedItems.includes(item.id))
        .map((item) => item.label),
      total: total,
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const registrants: Registrant[] = stored ? JSON.parse(stored) : [];
    registrants.push(registrant);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrants));

    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`
    );
    handleClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      id="modalregister"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors({ ...errors, firstName: false });
                  }}
                />
                <div className="invalid-feedback">Invalid first name</div>
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors({ ...errors, lastName: false });
                  }}
                />
                <div className="invalid-feedback">Invalid last name</div>
              </div>
            </div>
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${errors.plan ? "is-invalid" : ""}`}
                value={plan}
                onChange={(e) => {
                  setPlan(e.target.value);
                  setErrors({ ...errors, plan: false });
                }}
              >
                <option value="">Please select..</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Please select a Plan</div>
            </div>
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setErrors({ ...errors, gender: false });
                  }}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setErrors({ ...errors, gender: false });
                  }}
                />
                Female 👩
              </div>
              {errors.gender && (
                <div className="text-danger">Please select gender</div>
              )}
            </div>
            {/* Extra Items */}
            <div>
              <label className="form-label">Extra Item(s)</label>
              {extraItems.map((item) => (
                <div key={item.id}>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItem(item.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`item-${item.id}`}
                  >
                    {item.label} ({item.price.toLocaleString()} THB)
                  </label>
                </div>
              ))}
              {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
              {hasDiscount && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>Total Payment : {total.toLocaleString()} THB</div>
          </div>

          <div className="modal-footer">
            <div>
              <input
                className="me-2 form-check-input"
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="agree">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              className="btn btn-success my-2"
              disabled={!agree}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
