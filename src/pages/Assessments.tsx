import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AssessmentFilters from "@/components/AssessmentFilters";
import AssessmentTable from "@/components/AssessmentTable";
import AssessmentCreationOverlay from "@/components/AssessmentCreationOverlay";

const Assessments = () => {
  const [isCreationOverlayOpen, setIsCreationOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              Biology Assessments
            </h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => setIsCreationOverlayOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Assessment
            </Button>
          </div>

          <AssessmentFilters />
          <AssessmentTable />
        </div>
      </main>

      <AssessmentCreationOverlay 
        isOpen={isCreationOverlayOpen}
        onClose={() => setIsCreationOverlayOpen(false)}
      />
    </div>
  );
};

export default Assessments;