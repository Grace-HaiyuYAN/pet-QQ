import { useState } from "react";
import {
  aiSuggestions,
  employees,
  type EmployeeRecord,
  type SuggestionState,
} from "../../data/mockData";
import { AISuggestions } from "./AISuggestions";
import { CareTimeline } from "./CareTimeline";
import { EmployeeCard } from "./EmployeeCard";
import { StatsCards } from "./StatsCards";
import { TeamStatusGrid } from "./TeamStatusGrid";

export function HRDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord>(
    employees[0],
  );
  const [suggestions, setSuggestions] = useState(aiSuggestions);

  const handleSuggestionUpdate = (id: number, status: SuggestionState) => {
    setSuggestions((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  return (
    <section className="dashboard-shell">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">HR / 管理端</span>
          <h2>团队状态总览</h2>
          <p>从宠物状态里看见团队温度，也保留授权边界。</p>
        </div>
      </div>
      <StatsCards />
      <div className="dashboard-main-grid">
        <div className="dashboard-left-column">
          <TeamStatusGrid
            selectedEmployee={selectedEmployee}
            onSelect={setSelectedEmployee}
          />
          <AISuggestions
            suggestions={suggestions}
            onUpdate={handleSuggestionUpdate}
          />
        </div>
        <div className="dashboard-right-column">
          <EmployeeCard employee={selectedEmployee} />
          <CareTimeline />
        </div>
      </div>
    </section>
  );
}
