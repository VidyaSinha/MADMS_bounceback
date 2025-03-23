
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SubCriteriaItem {
  id: string;
  title: string;
  path: string;
}

interface SubCriteriaListProps {
  subCriteria: SubCriteriaItem[];
  criteriaTitle: string;
}

const SubCriteriaList: React.FC<SubCriteriaListProps> = ({ subCriteria, criteriaTitle }) => {
  return (
    <Card className="p-5 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 text-madms-charcoal">{criteriaTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subCriteria.map((item, index) => (
          <Link
            key={item.id}
            to={item.path}
            className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-madms-softgray transition-colors duration-200 group opacity-0 animate-slideIn"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
          >
            <span className="font-medium text-madms-medium">{item.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default SubCriteriaList;
