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
            <h1 className="text-3xl font-semibold text-foreground">
              Assessments
            </h1>
            <Button 
              className="bg-primary hover:bg-primary/90"
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