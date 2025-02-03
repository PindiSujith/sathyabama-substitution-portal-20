import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const LeaveApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Calculate date range for the next 30 days
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmLeave = () => {
    if (!selectedDate) return;

    // Get the current faculty's information
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

    // Create leave application
    const leaveApplications = JSON.parse(localStorage.getItem('leaveApplications') || '[]');
    const newLeaveApplication = {
      id: Date.now(),
      facultyId: currentFaculty.id,
      facultyName: currentFaculty.name,
      date: selectedDate,
      status: 'pending',
    };

    leaveApplications.push(newLeaveApplication);
    localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));

    toast({
      title: "Success",
      description: `Leave application submitted for ${format(selectedDate, 'MMMM dd, yyyy')}`,
    });

    setShowConfirmDialog(false);
    navigate('/faculty');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Leave Application</h1>
          
          <div className="flex flex-col items-center">
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
                {selectedDate && format(selectedDate, 'MMMM dd, yyyy')}?
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