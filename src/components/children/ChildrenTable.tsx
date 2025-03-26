
import React from 'react';
import { BarChart2, Calendar, User, Info } from 'lucide-react';

export interface Child {
  id: number;
  name: string;
  age: string;
  gender: 'male' | 'female';
  center: string;
  nutritionalStatus: 'severe' | 'moderate' | 'mild' | 'healthy';
  lastCheckup: string;
  vaccinations: number;
}

interface ChildrenTableProps {
  children: Child[];
  onViewDetails?: (child: Child) => void;
}

const ChildrenTable: React.FC<ChildrenTableProps> = ({ children, onViewDetails }) => {
  const getNutritionalStatusBadge = (status: string) => {
    switch (status) {
      case 'severe':
        return <span className="status-severe">Severe</span>;
      case 'moderate':
        return <span className="status-moderate">Moderate</span>;
      case 'mild':
        return <span className="status-mild">Mild</span>;
      case 'healthy':
        return <span className="status-healthy">Healthy</span>;
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
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Age/Gender</th>
              <th className="px-4 py-3 font-medium">Center</th>
              <th className="px-4 py-3 font-medium">Nutritional Status</th>
              <th className="px-4 py-3 font-medium">Last Checkup</th>
              <th className="px-4 py-3 font-medium">Vaccinations</th>
              <th className="px-4 py-3 font-medium sr-only">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {children.map((child) => (
              <tr 
                key={child.id} 
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{child.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center">
                    <User size={14} className="mr-1 text-muted-foreground" />
                    {child.age}, {child.gender === 'male' ? 'M' : 'F'}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{child.center}</td>
                <td className="px-4 py-3">{getNutritionalStatusBadge(child.nutritionalStatus)}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-muted-foreground" />
                    {child.lastCheckup}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-20 bg-muted rounded-full h-2 mr-2">
                      <div 
                        className="bg-anganwadi-primary h-2 rounded-full" 
                        style={{ width: `${(child.vaccinations / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{child.vaccinations}/10</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button 
                    onClick={() => onViewDetails?.(child)}
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

export default ChildrenTable;
