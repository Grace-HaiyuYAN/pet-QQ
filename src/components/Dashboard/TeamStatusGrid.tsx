import { employees, type EmployeeRecord } from "../../data/mockData";
import { PetAvatar } from "../Pet/PetAvatar";

export function TeamStatusGrid({
  selectedEmployee,
  onSelect,
}: {
  selectedEmployee: EmployeeRecord;
  onSelect: (employee: EmployeeRecord) => void;
}) {
  return (
    <div className="team-grid">
      {employees.map((employee) => (
        <button
          key={employee.id}
          type="button"
          className={`team-pet-card ${selectedEmployee.id === employee.id ? "team-pet-card-active" : ""}`}
          onClick={() => onSelect(employee)}
          title={`${employee.name} · ${employee.currentTask}`}
        >
          <PetAvatar
            small
            emoji={employee.avatar}
            status={employee.status}
            mood="happy"
          />
          <div className="team-pet-copy">
            <strong>{employee.name}</strong>
            <span>{employee.currentTask}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
