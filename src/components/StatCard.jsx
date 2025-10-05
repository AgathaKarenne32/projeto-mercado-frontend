import React from "react";

const StatCard = ({ label, value, className }) => {
  return (
    <div className={`stat-card ${className}`}>
      <h1 className="stat-label">{label}</h1>
      <p className="stat-value">{value}</p>
    </div>
  );
};

export default StatCard;
