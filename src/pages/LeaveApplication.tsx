import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LeaveApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Calculate date range for the next 30 days
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmLeave = () => {
    if (!selectedDate) return;

    // Get current faculty's information
    const currentFacultyId = localStorage.getItem('currentFacultyId');
    const facultyAccounts = JSON.parse(localStorage.getItem('facultyAccounts') || '[]');
    const currentFaculty = facultyAccounts.find(
      (account: any) => account.id.toString() === currentFacultyId
    );

    if (!currentFaculty) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Faculty not found",
      });
      return;
    }

    // Store leave application
    const leaveApplications = JSON.parse(localStorage.getItem('leaveApplications') || '[]');
    const newLeaveApplication = {
      id: Date.now(),
      facultyId: currentFaculty.id,
      facultyName: currentFaculty.name,
      date: selectedDate,
      status: 'approved',
    };

    leaveApplications.push(newLeaveApplication);
    localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));

    toast({
      title: "Success",
      description: `Your leave has been applied for ${selectedDate.toLocaleDateString()}`,
    });

    setShowConfirmDialog(false);
    navigate('/faculty');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#8B0000] text-white p-4 flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold">Apply for Leave</h1>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Leave Date</h2>
            <p className="text-gray-600">
              Please select a date within the next 30 days (excluding weekends)
            </p>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => 
                date < today || 
                date > maxDate || 
                date.getDay() === 0 || 
                date.getDay() === 6
              }
              className="rounded-md border"
            />
          </div>
        </Card>

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Leave Application</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to apply for leave on{" "}
                {selectedDate?.toLocaleDateString()}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmLeave}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LeaveApplication;