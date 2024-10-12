import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  to: string; // The link destination
  icon: React.ReactNode; // The icon to display
  title: string; // The title of the card
  description: string;
  className : string // The description of the card
}

const DashboardCard: React.FC<DashboardCardProps> = ({ to, icon, title, description, className }) => {
  return (
    <Link to={to} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 48, className: "mb-4" })}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default DashboardCard;