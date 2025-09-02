import { useState } from "react";
import { ArrowLeft, FileText, MessageSquare, Brain, Video, Eye, Grid, TreePine, ScrollText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AssessmentTypeSelectorProps {
  onSelect: (type: string) => void;
  onBack: () => void;
  fromContextual?: boolean;
}

const AssessmentTypeSelector = ({ onSelect, onBack, fromContextual }: AssessmentTypeSelectorProps) => {
  const [showAllTypes, setShowAllTypes] = useState(false);

  const recommendedTypes = [
    {
      id: "quiz",
      name: "Quiz",
      description: "Multiple choice, short answer, and mixed question types",
      icon: ScrollText,
      features: ["Auto-grading", "Question banks", "Time limits", "Multiple attempts"],
      reason: "Most used for algebra concepts"
    },
    {
      id: "assignment",
      name: "Assignment", 
      description: "Traditional project or task-based assessment",
      icon: FileText,
      features: ["File submissions", "Rubric grading", "Due dates", "Late penalties"],
      reason: "Great for problem-solving practice"
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Collection of student work demonstrating growth",
      icon: Grid,
      features: ["Multiple artifacts", "Reflection prompts", "Progress tracking", "Showcase format"],
      reason: "Perfect for showing mathematical reasoning"
    }
  ];

  const allAssessmentTypes = [
    ...recommendedTypes,
    {
      id: "discussion",
      name: "Discussion",
      description: "Collaborative conversation and peer interaction", 
      icon: MessageSquare,
      features: ["Threaded replies", "Peer responses", "Moderation tools", "Grading criteria"]
    },
    {
      id: "llm-powered",
      name: "LLM-powered Assignment",
      description: "AI-assisted assessment with intelligent feedback",
      icon: Brain,
      features: ["AI feedback", "Smart grading", "Writing analysis", "Plagiarism detection"],
      badge: "New"
    },
    {
      id: "video",
      name: "Video",
      description: "Video recording or presentation assessment",
      icon: Video,
      features: ["Recording tools", "Time limits", "Annotation support", "Privacy controls"]
    },
    {
      id: "observation",
      name: "Observation with Rubric",
      description: "Real-time assessment with structured observation",
      icon: Eye,
      features: ["Custom rubrics", "Real-time scoring", "Evidence collection", "Multiple observers"]
    },
    {
      id: "adaptive",
      name: "Adaptive",
      description: "Assessment that adapts difficulty based on student responses",
      icon: TreePine,
      features: ["Difficulty adjustment", "Personalized paths", "Smart progression", "Analytics"],
      badge: "Advanced"
    },
    {
      id: "branching",
      name: "Branching",
      description: "Conditional pathways based on student choices and performance",
      icon: TreePine,
      features: ["Conditional logic", "Multiple scenarios", "Decision trees", "Custom flows"],
      badge: "Advanced"
    }
  ];

  const typesToShow = showAllTypes ? allAssessmentTypes : recommendedTypes;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to options
      </Button>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          {showAllTypes ? "All Assessment Types" : "Recommended for You"}
        </h2>
        <p className="text-muted-foreground">
          {showAllTypes 
            ? "Browse all available assessment types"
            : "Based on your recent Linear Equations module and math teaching patterns"
          }
        </p>
      </div>

      {/* Assessment Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {typesToShow.map((type) => (
          <Card 
            key={type.id}
            className="p-6 hover:bg-accent/50 cursor-pointer transition-all border-2 hover:border-primary/30 hover:shadow-md"
            onClick={() => onSelect(type.id)}
          >
            <div className="space-y-4">
              {/* Header with Icon and Badges */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col space-y-1">
                  {'badge' in type && type.badge && (
                    <Badge variant="outline" className="text-xs">{type.badge}</Badge>
                  )}
                </div>
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{type.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.description}
                </p>
                {'reason' in type && (
                  <p className="text-xs text-primary font-medium">
                    {type.reason}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-foreground">Key features:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {type.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {type.features.length > 3 && (
                    <li className="text-primary font-medium">
                      +{type.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Toggle to show all types */}
      <div className="text-center pt-4 border-t border-border">
        <Button 
          variant="outline" 
          onClick={() => setShowAllTypes(!showAllTypes)}
          className="w-full"
        >
          {showAllTypes ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show recommended only
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Browse all assessment types
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentTypeSelector;