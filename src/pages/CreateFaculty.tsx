import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateFaculty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    timetable: Array(5).fill(Array(7).fill(""))
  });

  const timeSlots = ["9:00", "10:00", "11:15", "12:15", "1:15", "2:15", "3:15"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Account created",
      description: "Faculty account has been created successfully"
    });
    navigate("/admin"); // Changed from "/admin/manage" to "/admin"
  };

  const handleTimetableChange = (dayIndex: number, slotIndex: number, value: string) => {
    const newTimetable = formData.timetable.map((row, i) =>
      i === dayIndex ? row.map((cell, j) => (j === slotIndex ? value : cell)) : row
    );
    setFormData({ ...formData, timetable: newTimetable });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#8B0000] text-white p-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-[#700000]"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">SATHYABAMA</h1>
      </header>

      {/* Main Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">NAME OF STAFF :</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-[#8B0000]"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">USER ID :</label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border-[#8B0000]"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">PASSWORD :</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-[#8B0000]"
                required
              />
            </div>
          </div>

          {/* Timetable */}
          <div className="mt-8">
            <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-2">
              <div className=""></div>
              {timeSlots.map((time, i) => (
                <div key={i} className="text-center text-sm font-medium">
                  {time}
                </div>
              ))}
              
              {days.map((day, dayIndex) => (
                <>
                  <div key={`day-${dayIndex}`} className="text-sm font-medium">
                    {day}
                  </div>
                  {Array(7).fill(null).map((_, slotIndex) => (
                    <Input
                      key={`${dayIndex}-${slotIndex}`}
                      className="h-8 text-sm border-[#8B0000]"
                      value={formData.timetable[dayIndex][slotIndex]}
                      onChange={(e) => handleTimetableChange(dayIndex, slotIndex, e.target.value)}
                    />
                  ))}
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              type="submit"
              className="bg-[#8B0000] hover:bg-[#700000] text-white px-8"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaculty;