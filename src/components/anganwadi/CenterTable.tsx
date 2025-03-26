
import React from 'react';
import { MapPin, User, Phone, Info, MoreHorizontal } from 'lucide-react';

export interface Center {
  id: number;
  name: string;
  location: string;
  supervisor: string;
  contact: string;
  status: 'active' | 'inactive' | 'maintenance';
  performance: 'excellent' | 'good' | 'average' | 'poor';
  lastVisit: string;
}

interface CenterTableProps {
  centers: Center[];
  onViewDetails?: (center: Center) => void;
}

const CenterTable: React.FC<CenterTableProps> = ({ centers, onViewDetails }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-anganwadi-healthy/10 text-anganwadi-healthy text-xs px-2 py-1 rounded-full">Active</span>;
      case 'inactive':
        return <span className="bg-anganwadi-severe/10 text-anganwadi-severe text-xs px-2 py-1 rounded-full">Inactive</span>;
      case 'maintenance':
        return <span className="bg-anganwadi-moderate/10 text-anganwadi-moderate text-xs px-2 py-1 rounded-full">Maintenance</span>;
      default:
        return null;
    }
  };
  
  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <span className="bg-anganwadi-healthy/10 text-anganwadi-healthy text-xs px-2 py-1 rounded-full">Excellent</span>;
      case 'good':
        return <span className="bg-anganwadi-healthy/10 text-anganwadi-healthy text-xs px-2 py-1 rounded-full">Good</span>;
      case 'average':
        return <span className="bg-anganwadi-mild/10 text-anganwadi-mild text-xs px-2 py-1 rounded-full">Average</span>;
      case 'poor':
        return <span className="bg-anganwadi-severe/10 text-anganwadi-severe text-xs px-2 py-1 rounded-full">Poor</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Center</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Supervisor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Performance</th>
              <th className="px-4 py-3 font-medium">Last Visit</th>
              <th className="px-4 py-3 font-medium sr-only">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {centers.map((center) => (
              <tr 
                key={center.id} 
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{center.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 text-muted-foreground" />
                    {center.location}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center">
                    <User size={14} className="mr-1 text-muted-foreground" />
                    {center.supervisor}
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(center.status)}</td>
                <td className="px-4 py-3">{getPerformanceBadge(center.performance)}</td>
                <td className="px-4 py-3 text-muted-foreground">{center.lastVisit}</td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => onViewDetails?.(center)}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    <Info size={16} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CenterTable;
