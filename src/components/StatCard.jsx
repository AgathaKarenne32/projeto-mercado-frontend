import React from "react";

const StatCard = ({ label, value, className }) => {
  return (
    <div className={`stat-card ${className}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatCard;
