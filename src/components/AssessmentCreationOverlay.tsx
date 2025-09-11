import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AssessmentTypeSelector from "./AssessmentTypeSelector";
import ContextualSuggestion from "./ContextualSuggestion";

interface AssessmentCreationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlowStep = "type-selection" | "contextual";

const AssessmentCreationOverlay = ({ isOpen, onClose }: AssessmentCreationOverlayProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("type-selection");

  if (!isOpen) return null;

  const handleAiSuggestion = () => {
    setCurrentStep("contextual");
  };

  const handleContextualResponse = (accepted: boolean) => {
    if (accepted) {
      // Would navigate to pre-configured builder
      console.log("Navigating to pre-configured assessment builder");
      onClose();
    } else {
      // Return to type selection
      setCurrentStep("type-selection");
    }
  };

  const handleBrowseAll = () => {
    setCurrentStep("type-selection");
  };

  const handleTypeSelection = (type: string) => {
    console.log("Creating assessment of type:", type);
    // Would navigate to assessment builder with selected type
    onClose();
  };


  const renderCurrentStep = () => {
    switch (currentStep) {
      case "type-selection":
        return (
          <AssessmentTypeSelector 
            onSelect={handleTypeSelection}
            onAiSuggestion={handleAiSuggestion}
          />
        );
      case "contextual":
        return (
          <ContextualSuggestion 
            onResponse={handleContextualResponse}
            onBrowseAll={() => setCurrentStep("type-selection")}
          />
        );
      default:
        return (
          <AssessmentTypeSelector 
            onSelect={handleTypeSelection}
            onAiSuggestion={handleAiSuggestion}
          />
        );
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