import { ArrowLeft, FileText, MessageSquare, Brain, Video, Eye, Grid, TreePine, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AssessmentTypeSelectorProps {
  onSelect: (type: string) => void;
  onBack: () => void;
  fromContextual?: boolean;
}

const AssessmentTypeSelector = ({ onSelect, onBack, fromContextual }: AssessmentTypeSelectorProps) => {
  const assessmentTypes = [
    {
      id: "assignment",
      name: "Assignment",
      description: "Traditional project or task-based assessment",
      icon: FileText,
      difficulty: "Easy",
      time: "15-30 min setup",
      popular: true,
      features: ["File submissions", "Rubric grading", "Due dates", "Late penalties"]
    },
    {
      id: "discussion",
      name: "Discussion",
      description: "Collaborative conversation and peer interaction",
      icon: MessageSquare,
      difficulty: "Easy",
      time: "10-20 min setup",
      popular: true,
      features: ["Threaded replies", "Peer responses", "Moderation tools", "Grading criteria"]
    },
    {
      id: "quiz",
      name: "Quiz",
      description: "Multiple choice, short answer, and mixed question types",
      icon: ScrollText,
      difficulty: "Medium",
      time: "20-45 min setup",
      popular: true,
      features: ["Auto-grading", "Question banks", "Time limits", "Multiple attempts"]
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Collection of student work demonstrating growth",
      icon: Grid,
      difficulty: "Medium",
      time: "30-60 min setup",
      popular: false,
      features: ["Multiple artifacts", "Reflection prompts", "Progress tracking", "Showcase format"]
    },
    {
      id: "llm-powered",
      name: "LLM-powered Assignment",
      description: "AI-assisted assessment with intelligent feedback",
      icon: Brain,
      difficulty: "Advanced",
      time: "25-40 min setup",
      popular: false,
      features: ["AI feedback", "Smart grading", "Writing analysis", "Plagiarism detection"],
      badge: "New"
    },
    {
      id: "video",
      name: "Video",
      description: "Video recording or presentation assessment",
      icon: Video,
      difficulty: "Easy",
      time: "15-25 min setup",
      popular: false,
      features: ["Recording tools", "Time limits", "Annotation support", "Privacy controls"]
    },
    {
      id: "observation",
      name: "Observation with Rubric",
      description: "Real-time assessment with structured observation",
      icon: Eye,
      difficulty: "Medium",
      time: "20-35 min setup",
      popular: false,
      features: ["Custom rubrics", "Real-time scoring", "Evidence collection", "Multiple observers"]
    },
    {
      id: "item-based",
      name: "Item Based Assessment",
      description: "Structured assessment with predefined item types",
      icon: Grid,
      difficulty: "Medium",
      time: "25-40 min setup",
      popular: false,
      features: ["Item templates", "Standards alignment", "Detailed analytics", "Question weighting"]
    },
    {
      id: "adaptive",
      name: "Adaptive / Branching",
      description: "Dynamic assessment that adapts to student responses",
      icon: TreePine,
      difficulty: "Advanced",
      time: "45-90 min setup",
      popular: false,
      features: ["Conditional logic", "Personalized paths", "Difficulty adjustment", "Advanced analytics"],
      badge: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-emerald-600 bg-emerald-100";
      case "Medium": return "text-amber-600 bg-amber-100";
      case "Advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

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
          Browse All Assessment Types
        </h2>
        <p className="text-muted-foreground">
          Select the type of assessment that best fits your teaching goals
        </p>
      </div>

      {/* Assessment Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessmentTypes.map((type) => (
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
                  {type.popular && (
                    <Badge variant="secondary" className="text-xs">Popular</Badge>
                  )}
                  {type.badge && (
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
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(type.difficulty)}`}>
                  {type.difficulty}
                </span>
                <span className="text-muted-foreground">{type.time}</span>
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
    </div>
  );
};

export default AssessmentTypeSelector;