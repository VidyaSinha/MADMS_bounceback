import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface FormData {
  name: string;
  companyName?: string;
  appointmentDate?: string;
  offerLetter?: File;
  examName?: string;
  resultDocument?: File;
  gstNumber?: string;
  gstDocument?: File;
}

interface placementTable {
  
  name: string;
  enrollmentNo: string;
  lbr: string;
}
const PlacementPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeForm, setActiveForm] = useState<'placement' | 'higherStudies' | 'entrepreneurship' | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '' });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<placementTable | null>(null);
  

  const [tablecontent, setcontent] = useState<placementTable[]>([
    {name:'Rajvi',enrollmentNo:'38',lbr:''},
    {name:'Diya',enrollmentNo:'34',lbr:''},
    {name:'Shyama',enrollmentNo:'05',lbr:''},
  ])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setShowAdditionalFields(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const renderNameForm = () => (
    <form onSubmit={handleNameSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Student Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter student name"
          required
        />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );

  const renderPlacementForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={formData.companyName || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
          placeholder="Enter company name"
          required
        />
      </div>
      <div>
        <Label htmlFor="appointmentDate">Appointment Date</Label>
        <Input
          id="appointmentDate"
          type="date"
          value={formData.appointmentDate || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="offerLetter">Offer Letter (PDF)</Label>
        <Input
          id="offerLetter"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'offerLetter')}
          required
        />
      </div>
    </div>
  );

  const renderHigherStudiesForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="examName">Exam Name</Label>
        <Input
          id="examName"
          value={formData.examName || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, examName: e.target.value }))}
          placeholder="Enter exam name (GATE/GRE/GMAT)"
          required
        />
      </div>
      <div>
        <Label htmlFor="resultDocument">Result Document</Label>
        <Input
          id="resultDocument"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'resultDocument')}
          required
        />
      </div>
    </div>
  );

  const renderEntrepreneurshipForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input
          id="gstNumber"
          value={formData.gstNumber || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, gstNumber: e.target.value }))}
          placeholder="Enter GST number"
          required
        />
      </div>
      <div>
        <Label htmlFor="gstDocument">GST Document</Label>
        <Input
          id="gstDocument"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'gstDocument')}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      
        {!showDetails && (
          <Button onClick={() => setShowDetails(true)} className="mb-4">
            Add Details
          </Button>
        )}
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
        
        <div className="flex justify-between items-center mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Item</th>
              <th className="border border-gray-300 p-2">CAYm1 (2023-24)</th>
              <th className="border border-gray-300 p-2">CAYm2 (2022-23)</th>
              <th className="border border-gray-300 p-2">CAYm3 (2021-22)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Total No of Final Year Students(N)</td>
              <td className="border border-gray-300 p-2">49</td>
              <td className="border border-gray-300 p-2">48</td>
              <td className="border border-gray-300 p-2">42</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">No of students placed in companies or government sector(X)</td>
              <td className="border border-gray-300 p-2">37</td>
              <td className="border border-gray-300 p-2">31</td>
              <td className="border border-gray-300 p-2">34</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">No of students admitted to higher studies with valid qualifying scores (GATE or equivalent State or National Level tests, GRE, GMAT etc.) (Y)</td>
              <td className="border border-gray-300 p-2">06</td>
              <td className="border border-gray-300 p-2">08</td>
              <td className="border border-gray-300 p-2">2</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">No of students turned entrepreneur in engineering/technology (Z)</td>
              <td className="border border-gray-300 p-2">03</td>
              <td className="border border-gray-300 p-2">07</td>
              <td className="border border-gray-300 p-2">5</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Placement Index [ (X+Y+Z)/N] :</td>
              <td className="border border-gray-300 p-2">46</td>
              <td className="border border-gray-300 p-2">46</td>
              <td className="border border-gray-300 p-2">41</td>
            </tr>
          </tbody>
        </table>

        <DataTable value={tablecontent} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
                  <Column field="name" header="name" sortable style={{ width: '25%' }}></Column>
                  <Column field="enrollmentNo" header="enrollmentNo" sortable style={{ width: '25%' }}></Column>
              
                    <Column field="lbr" header="Result/Bill/JoiningLetter" body={(rowData) => (
                                  <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                                )} style={{ minWidth: '10rem' }}></Column>
                    
                    <Column body={(rowData) => (
                      <div className="flex gap-2 justify-center">
                        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
                        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {
    setStudentToDelete(rowData);
    setShowDeleteDialog(true);
  }} />
                        </div>
                    )} exportable={false} style={{ minWidth: '8rem' }}></Column>
              </DataTable>

              </div>
              
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogContent className="sm:max-w-[400px] text-center space-y-4">
    <DialogTitle>Are you sure you want to delete?</DialogTitle>
    <div className="flex justify-center space-x-4 pt-4">
      <button
        onClick={() => {
          if (studentToDelete) {
            setcontent(prev => prev.filter(p => p.enrollmentNo !== studentToDelete.enrollmentNo));
          }
          setShowDeleteDialog(false);
          setStudentToDelete(null);
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Yes
      </button>
      <button
        onClick={() => setShowDeleteDialog(false)}
        className="px-4 py-2 border rounded-md hover:bg-gray-100"
      >
        No
      </button>
    </div>
  </DialogContent>
</Dialog>



        <div className="text-center mt-4">
          <p>Average Placement [ (P1 + P2 + P3)/3]: 0.96</p>
          <p>Assessment [ 30 * Average Placement]:</p>
        </div>
      </div>
      

      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Placement Form</h3>
            <Button
              onClick={() => {
                setActiveForm('placement');
                setShowAdditionalFields(false);
                setFormData({ name: '' });
              }}
              className="w-full"
            >
              Fill Placement Details
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Higher Studies Form</h3>
            <Button
              onClick={() => {
                setActiveForm('higherStudies');
                setShowAdditionalFields(false);
                setFormData({ name: '' });
              }}
              className="w-full"
            >
              Fill Higher Studies Details
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Entrepreneurship Form</h3>
            <Button
              onClick={() => {
                setActiveForm('entrepreneurship');
                setShowAdditionalFields(false);
                setFormData({ name: '' });
              }}
              className="w-full"
            >
              Fill Entrepreneurship Details
            </Button>
          </Card>
        </div>
      )}

      {activeForm && (
        <Card className="mt-6 p-6">
          <h3 className="text-xl font-semibold mb-4">
            {activeForm === 'placement' && 'Placement Details'}
            {activeForm === 'higherStudies' && 'Higher Studies Details'}
            {activeForm === 'entrepreneurship' && 'Entrepreneurship Details'}
          </h3>
          
          {!showAdditionalFields ? (
            renderNameForm()
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <Label>Student Name: {formData.name}</Label>
              </div>
              
              {activeForm === 'placement' && renderPlacementForm()}
              {activeForm === 'higherStudies' && renderHigherStudiesForm()}
              {activeForm === 'entrepreneurship' && renderEntrepreneurshipForm()}
              
              <Button type="submit">Submit</Button>
            </form>
          )}
        </Card>
      )}
    </div>
  );
};

export default PlacementPage;