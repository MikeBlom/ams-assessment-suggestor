import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AssessmentFilters from "@/components/AssessmentFilters";
import AssessmentTable from "@/components/AssessmentTable";

const Assessments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-foreground">
              Assessments
            </h1>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Assessment
            </Button>
          </div>

          <AssessmentFilters />
          <AssessmentTable />
        </div>
      </main>
    </div>
  );
};

export default Assessments;