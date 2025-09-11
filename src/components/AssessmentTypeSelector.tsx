import { useState } from "react";
import { X, Lightbulb, BookOpen, FileText, MessageCircle, Folder, Video, Clipboard, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AssessmentTypeSelectorProps {
  onSelect: (type: string) => void;
  onAiSuggestion: () => void;
}

const AssessmentTypeSelector = ({ onSelect, onAiSuggestion }: AssessmentTypeSelectorProps) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState({
    title: "Based on your Cell Biology unit, try a Photosynthesis Lab Report?",
    description: "Perfect for assessing student understanding of energy conversion processes"
  });

  const suggestions = [
    {
      title: "Based on your Cell Biology unit, try a Photosynthesis Lab Report?",
      description: "Perfect for assessing student understanding of energy conversion processes"
    },
    {
      title: "How about a Cellular Respiration Quiz for your Energy Transfer module?",
      description: "Great for checking comprehension of ATP production and metabolic pathways"
    },
    {
      title: "Consider a DNA Replication Discussion based on your recent genetics lessons?",
      description: "Encourages collaborative learning about molecular biology concepts"
    }
  ];

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      setCurrentSuggestion(suggestions[randomIndex]);
      setIsRegenerating(false);
    }, 1000);
  };

  const handleFileUpload = () => {
    // Would open file picker for PowerPoint, PDFs, etc.
    console.log("Opening file picker for source materials");
  };
  const assessmentTypes = [
    {
      id: "quiz",
      name: "Quiz",
      description: "Quick knowledge checks and formative assessments",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "assignment",
      name: "Assignment", 
      description: "Comprehensive tasks and projects",
      icon: FileText,
      color: "bg-green-50 text-green-600"
    },
    {
      id: "discussion",
      name: "Discussion",
      description: "Collaborative conversations and peer learning",
      icon: MessageCircle,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Collection of student work over time",
      icon: Folder,
      color: "bg-orange-50 text-orange-600"
    },
    {
      id: "video",
      name: "Video",
      description: "Video submissions and presentations",
      icon: Video,
      color: "bg-red-50 text-red-600"
    },
    {
      id: "observation",
      name: "Observation with Rubric",
      description: "Performance-based assessment with structured criteria",
      icon: Clipboard,
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      id: "adaptive",
      name: "Adaptive",
      description: "Assessment that adapts difficulty based on student responses",
      icon: RefreshCw,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: "branching",
      name: "Branching",
      description: "Conditional pathways based on student choices and performance",
      icon: Upload,
      color: "bg-teal-50 text-teal-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Create Assessment</h2>
          <p className="text-muted-foreground">Choose the type of assessment you'd like to create</p>
        </div>
      </div>

      {/* AI Suggestion Card */}
      <Card className="relative overflow-hidden border-0 p-6" style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
      }}>
        <div className="space-y-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-semibold">AI Assistant</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {isRegenerating ? "Thinking of new suggestions..." : currentSuggestion.title}
            </h3>
            <p className="text-white/80 text-sm">
              {isRegenerating ? "Please wait while I generate fresh ideas" : currentSuggestion.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={onAiSuggestion}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              disabled={isRegenerating}
            >
              Create This Assessment
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="text-white hover:bg-white/10"
            >
              {isRegenerating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Regenerate Suggestions
            </Button>
          </div>

          <div className="pt-3 border-t border-white/20">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleFileUpload}
              className="text-white hover:bg-white/10 w-full justify-start"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload your materials (PowerPoint, notes) for tailored suggestions
            </Button>
          </div>
        </div>
      </Card>

      {/* Assessment Types Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Or choose an assessment type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessmentTypes.map((type) => (
            <Card 
              key={type.id}
              className="p-4 hover:shadow-md cursor-pointer transition-all border border-gray-200 hover:border-gray-300"
              onClick={() => onSelect(type.id)}
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">{type.name}</h4>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentTypeSelector;