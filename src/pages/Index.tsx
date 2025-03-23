
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, BookOpenCheck, BarChart3, Building2, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-6 opacity-0 animate-fadeIn">
        <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-sm font-medium text-primary mb-2">
          Marwadi University
        </div>
        <h1 className="text-4xl font-bold text-madms-charcoal md:text-5xl">
          Accreditation and Data Management System
        </h1>
        <p className="text-xl text-muted-foreground">
          Welcome to MADMS - Your comprehensive solution for managing institutional accreditation data.
        </p>
        <div className="pt-4">
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 transition-all duration-300 ease-in-out bg-primary hover:bg-primary/90">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "NBA", 
            description: "National Board of Accreditation", 
            icon: <Award className="h-5 w-5" />,
            path: "/dashboard/nba",
            delay: "animation-delay-100"
          },
          { 
            title: "NAAC", 
            description: "National Assessment and Accreditation Council", 
            icon: <BookOpenCheck className="h-5 w-5" />,
            path: "/dashboard/naac",
            delay: "animation-delay-200"
          },
          { 
            title: "NIRF", 
            description: "National Institutional Ranking Framework", 
            icon: <BarChart3 className="h-5 w-5" />,
            path: "/dashboard/nirf",
            delay: "animation-delay-300"
          },
          { 
            title: "COE", 
            description: "Center of Excellence", 
            icon: <Building2 className="h-5 w-5" />,
            path: "/dashboard/coe",
            delay: "animation-delay-400"
          },
          { 
            title: "QoS", 
            description: "Quality of Service", 
            icon: <ClipboardList className="h-5 w-5" />,
            path: "/dashboard/qos",
            delay: "animation-delay-500"
          }
        ].map((item, index) => (
          <Card key={index} className={`overflow-hidden opacity-0 animate-scaleIn ${item.delay}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <p className="text-sm text-muted-foreground">
                Access and manage all {item.title} accreditation criteria and data in one place.
              </p>
            </CardContent>
            <CardFooter>
              <Link to={item.path} className="w-full">
                <Button variant="outline" className="w-full text-primary justify-between group">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
