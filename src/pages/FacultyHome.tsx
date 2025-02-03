import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FacultyAccount {
  id: number;
  name: string;
  username: string;
  timetable: string[][];
}

const FacultyHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<FacultyAccount | null>(null);

  const timeSlots = ["9:00", "10:00", "11:15", "12:15", "1:15", "2:15"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  useEffect(() => {
    const currentFacultyId = localStorage.getItem('currentFacultyId');
    if (!currentFacultyId) {
      toast({
        variant: "destructive",
        title: "Not authorized",
        description: "Please login to access this page"
      });
      navigate('/login');
      return;
    }

    const facultyAccounts = JSON.parse(localStorage.getItem('facultyAccounts') || '[]');
    const currentFaculty = facultyAccounts.find(
      (account: FacultyAccount) => account.id.toString() === currentFacultyId
    );

    if (currentFaculty) {
      setFaculty(currentFaculty);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Faculty account not found"
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  if (!faculty) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#8B0000] text-white p-4 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">SATHYABAMA</h1>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-end">
          <Button 
            onClick={() => navigate('/faculty/leave')}
            className="bg-sathyabama-blue hover:bg-sathyabama-light"
          >
            Apply for Leave
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Faculty Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {faculty.name}</p>
              <p><span className="font-medium">User ID:</span> {faculty.username}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 min-w-[800px]">
                <div></div>
                {timeSlots.map((time, i) => (
                  <div key={i} className="text-center text-sm font-medium">
                    {time}
                  </div>
                ))}
                
                {days.map((day, dayIndex) => (
                  <React.Fragment key={`day-${dayIndex}`}>
                    <div className="text-sm font-medium">
                      {day}
                    </div>
                    {Array(6).fill(null).map((_, slotIndex) => (
                      <div
                        key={`${dayIndex}-${slotIndex}`}
                        className="border p-2 text-sm text-center"
                      >
                        {faculty.timetable[dayIndex][slotIndex]}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyHome;