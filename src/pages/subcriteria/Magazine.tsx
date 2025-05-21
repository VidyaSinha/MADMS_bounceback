import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

import MainLayout from '@/components/layout/MainLayout';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Button } from 'primereact/button';
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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { useApi } from '@/contexts/ApiContext';

interface Magazine {
  id: number;
  magazineFrontUrl: string;
  yearPublished: string;
}

const MagazinePage = () => {
  const navigate = useNavigate();
  const { apiBaseUrl } = useApi();

  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [year, setYear] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchMagazines = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/upload-magazine`);
      if (Array.isArray(response.data)) {
        setMagazines(response.data);
      } else {
        console.error('Unexpected response format, expected array:', response.data);
        setMagazines([]);
      }
    } catch (error) {
      console.error('Error fetching magazines:', error);
      setMagazines([]);
    }
  };

  useEffect(() => {
    fetchMagazines();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBaseUrl]);

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const handleSubmit = async () => {
    if (!selectedFile || !year) {
      alert('Please provide both year and magazine front page.');
      return;
    }

    const formData = new FormData();
    formData.append('yearPublished', year);
    formData.append('magazineFront', selectedFile);

    try {
      await axios.post(`${apiBaseUrl}/upload-magazine`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  toast.success('Magazine uploaded successfully!');
        
      setYear('');
      setSelectedFile(null);
      setIsDialogOpen(false); 
      fetchMagazines();
    } catch (error) {
      console.error('Error submitting magazine:', error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <ShadcnButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 4
            </ShadcnButton>
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

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <ShadcnButton
                  className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
                >
                  Add Details
                </ShadcnButton>
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
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSubmit} className="bg-[#2F4883] hover:bg-slate-900">
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <DataTable value={Array.isArray(magazines) ? magazines : []} tableStyle={{ minWidth: '50rem' }} dataKey="id">
              <Column
                field="magazineFrontUrl"
                header="Magazine Front"
                body={(rowData: Magazine) => (
                  <a href={rowData.magazineFrontUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      icon="pi pi-eye"
                      className="p-button-rounded p-button-text"
                      tooltip="View"
                    />
                  </a>
                )}
                style={{ minWidth: '10rem' }}
              />
              <Column
                field="yearPublished"
                header="Year Published"
                sortable
                style={{ width: '25%' }}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MagazinePage;
