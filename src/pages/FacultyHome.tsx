import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const FacultyHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
          <p>Faculty Home page content will be implemented here</p>
        </Card>
      </div>
    </div>
  );
};

export default FacultyHome;