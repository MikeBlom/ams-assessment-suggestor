import { useState } from "react";
import { X, BookOpen, Target, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AssessmentTypeSelector from "./AssessmentTypeSelector";
import ContextualSuggestion from "./ContextualSuggestion";

interface AssessmentCreationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlowStep = "decision" | "contextual" | "direct" | "type-selection";

const AssessmentCreationOverlay = ({ isOpen, onClose }: AssessmentCreationOverlayProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("decision");
  const [selectedPath, setSelectedPath] = useState<"contextual" | "direct" | null>(null);

  if (!isOpen) return null;

  const handlePathSelection = (path: "contextual" | "direct") => {
    setSelectedPath(path);
    if (path === "contextual") {
      setCurrentStep("contextual");
    } else {
      setCurrentStep("type-selection");
    }
  };

  const handleContextualResponse = (accepted: boolean) => {
    if (accepted) {
      // Would navigate to pre-configured builder
      console.log("Navigating to pre-configured assessment builder");
      onClose();
    } else {
      setCurrentStep("type-selection");
    }
  };

  const handleTypeSelection = (type: string) => {
    console.log("Creating assessment of type:", type);
    // Would navigate to assessment builder with selected type
    onClose();
  };

  const renderDecisionStep = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Create New Assessment</h2>
        <p className="text-muted-foreground text-lg">How would you like to get started?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="p-6 hover:bg-accent/50 cursor-pointer transition-colors border-2 hover:border-primary/30"
          onClick={() => handlePathSelection("contextual")}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Smart Suggestion</h3>
              <p className="text-muted-foreground">
                Let me suggest an assessment based on your recent teaching context
              </p>
            </div>
            <div className="text-sm text-emerald-600 font-medium">
              Recommended • Faster setup
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 hover:bg-accent/50 cursor-pointer transition-colors border-2 hover:border-primary/30"
          onClick={() => handlePathSelection("direct")}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Start from Scratch</h3>
              <p className="text-muted-foreground">
                Choose your assessment type and build it your way
              </p>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              Full control • All options
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "decision":
        return renderDecisionStep();
      case "contextual":
        return (
          <ContextualSuggestion 
            onResponse={handleContextualResponse}
            onBack={() => setCurrentStep("decision")}
          />
        );
      case "type-selection":
        return (
          <AssessmentTypeSelector 
            onSelect={handleTypeSelection}
            onBack={() => setCurrentStep("decision")}
            fromContextual={selectedPath === "contextual"}
          />
        );
      default:
        return renderDecisionStep();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Overlay Content */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="p-8 shadow-2xl border border-border/50">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {renderCurrentStep()}
        </Card>
      </div>
    </div>
  );
};

export default AssessmentCreationOverlay;