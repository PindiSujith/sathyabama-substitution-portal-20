import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";

const CreateFaculty = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create Faculty Account</h1>
          <p>Create Faculty page content will be implemented here</p>
        </Card>
      </div>
    </div>
  );
};

export default CreateFaculty;