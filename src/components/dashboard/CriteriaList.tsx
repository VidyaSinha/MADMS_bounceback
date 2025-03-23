
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CriteriaItem {
  id: string;
  title: string;
  path: string;
}

interface CriteriaListProps {
  criteria: CriteriaItem[];
  title: string;
}

const CriteriaList: React.FC<CriteriaListProps> = ({ criteria, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-5 animate-fadeIn">
      <h3 className="text-lg font-medium mb-4 text-madms-charcoal">{title}</h3>
      <div className="space-y-2">
        {criteria.map((item, index) => (
          <Link
            key={item.id}
            to={item.path}
            className="flex items-center justify-between p-3 hover:bg-madms-softgray rounded-md transition-colors duration-200 group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="font-medium text-madms-medium">{item.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CriteriaList;
