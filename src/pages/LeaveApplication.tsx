import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LeaveFormData {
  date: Date;
  reason: string;
}

const LeaveApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const form = useForm<LeaveFormData>({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: LeaveFormData) => {
    if (!selectedDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date",
      });
      return;
    }

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
      reason: data.reason,
      status: 'pending',
      timetable: currentFaculty.timetable,
    };

    leaveApplications.push(newLeaveApplication);
    localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));

    toast({
      title: "Success",
      description: "Leave application submitted successfully",
    });

    navigate('/faculty');
  };

  // Calculate date range for the next month
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Leave Application</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => 
                        date < today || 
                        date > maxDate || 
                        date.getDay() === 0 || 
                        date.getDay() === 6
                      }
                      className="rounded-md border"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Leave</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide a reason for your leave request"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                className="w-full bg-sathyabama-blue hover:bg-sathyabama-light"
              >
                Submit Leave Application
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LeaveApplication;