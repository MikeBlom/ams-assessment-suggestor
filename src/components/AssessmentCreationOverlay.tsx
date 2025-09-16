import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AssessmentTypeSelector from "./AssessmentTypeSelector";
import ContextualSuggestion from "./ContextualSuggestion";
import LabReportTemplate from "./LabReportTemplate";

interface AssessmentCreationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type FlowStep = "type-selection" | "contextual" | "template-builder";

const AssessmentCreationOverlay = ({ isOpen, onClose }: AssessmentCreationOverlayProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("type-selection");

  if (!isOpen) return null;

  const handleAiSuggestion = () => {
    setCurrentStep("template-builder");
  };

  const handleContextualResponse = (accepted: boolean) => {
    if (accepted) {
      // Move to template builder
      setCurrentStep("template-builder");
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
    // For Photosynthesis Lab Report, go to template builder
    if (type === "lab-report") {
      setCurrentStep("template-builder");
    } else {
      // For other types, navigate to builder
      window.location.href = `/assessment-builder?type=${type}`;
      onClose();
    }
  };


  const handleTemplateComplete = () => {
    console.log("Template completed, navigating to full builder");
    // Navigate to full assessment builder
    window.location.href = `/assessment-builder?type=lab-report&template=photosynthesis`;
    onClose();
  };

  const handleTemplateBack = () => {
    setCurrentStep("contextual");
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
      case "template-builder":
        return (
          <LabReportTemplate 
            onComplete={handleTemplateComplete}
            onBack={handleTemplateBack}
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