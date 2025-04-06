import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MagazinePage = () => {
  const navigate = useNavigate();
  const [showMagazineForm, setShowMagazineForm] = useState(false);
  const [year, setYear] = useState('');

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 4
            </Button>
          </div>

          <div>
            <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
              <h1 className="text-2xl font-bold text-center">
                4.5.2 - Publication of Technical Magazines and Newsletter
              </h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Magazine Details</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F4883] hover:bg-slate-900">
                    + Add Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Magazine Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="year">Publication Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter publication year"
                        min="1900"
                        max="2099"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frontpage">Magazine Front Page</Label>
                      <Input
                        id="frontpage"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#2F4883] hover:bg-slate-900">
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              {/* Table will be added here for displaying magazine entries */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MagazinePage;