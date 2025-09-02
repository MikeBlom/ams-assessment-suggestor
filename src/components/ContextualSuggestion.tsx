import { ArrowRight, CheckCircle, FileText, Users, Brain, MessageSquare, ScrollText, Video, BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContextualSuggestionProps {
  onResponse: (accepted: boolean) => void;
  onBack: () => void;
  onBrowseAll: () => void;
}

const ContextualSuggestion = ({ onResponse, onBack, onBrowseAll }: ContextualSuggestionProps) => {
  // Mock recent module data - in real app this would come from context/API
  const recentModule = {
    title: "Cell Structure and Function",
    subject: "Biology 101",
    completedDate: "2 days ago",
    studentsCompleted: 23,
    totalStudents: 27,
    quickStartOptions: [
      {
        type: "Recently assessed concepts",
        action: "Retake: Photosynthesis Quiz",
        detail: "Last assessed 1 week ago • 3 students requested retake"
      },
      {
        type: "Recently completed assignments",
        action: "Assess: Cell Structure Lab Report", 
        detail: "Lab completed 2 days ago • 27 students submitted"
      },
      {
        type: "Last assessment built",
        action: "Duplicate: Mitosis Quiz Template",
        detail: "Built 3 days ago • High student engagement"
      }
    ]
  };

  const suggestedAssessments = [
    {
      type: "Portfolio",
      description: "Multi-step problem solving with reflection",
      icon: FileText,
      features: ["Real-world application problems", "Step-by-step solution process", "Self-reflection component"],
      reason: "Perfect for showing biological reasoning"
    },
    {
      type: "Discussion",
      description: "Collaborative analysis of biological concepts",
      icon: MessageSquare,
      features: ["Peer concept comparison", "Strategy discussion", "Group insights"],
      reason: "Great for complex biology topics"
    },
    {
      type: "Quiz",
      description: "Mixed question types testing core concepts",
      icon: ScrollText,
      features: ["Auto-graded problems", "Immediate feedback", "Multiple attempts"],
      reason: "Most used for biology concepts"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Smart Assessment Suggestions</h2>
            <p className="text-muted-foreground">Based on your recent teaching activity in Biology 101</p>
          </div>
        </div>

        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Recently completed</span>
              </div>
              <h3 className="font-semibold text-emerald-900">{recentModule.title}</h3>
              <p className="text-sm text-emerald-700">{recentModule.subject}</p>
              <div className="flex items-center space-x-4 text-xs text-emerald-600">
                <span>Completed {recentModule.completedDate}</span>
                <span>{recentModule.studentsCompleted}/{recentModule.totalStudents} students</span>
              </div>
              
              {/* Quick Start Options in Green Section */}
              <div className="mt-3 space-y-2">
                {recentModule.quickStartOptions.map((option, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-emerald-800">{option.action}</div>
                    <div className="text-xs text-emerald-600">{option.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Assessment Type Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Ready-to-use assessments for "{recentModule.title}"
        </h3>
        
        <div className="grid gap-4">
          {suggestedAssessments.map((assessment, index) => (
            <Card 
              key={index}
              className={`p-6 cursor-pointer transition-all border-2 hover:shadow-md ${
                index === 0
                  ? 'border-primary/20 bg-primary/5 hover:border-primary/40' 
                  : 'border-border hover:border-primary/30 hover:bg-accent/50'
              }`}
              onClick={() => onResponse(true)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-primary/10' : 'bg-accent'
                }`}>
                  <assessment.icon className={`w-6 h-6 ${
                    index === 0 ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{assessment.type}</h4>
                    {index === 0 && <Badge variant="secondary">Recommended</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-3">{assessment.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-primary font-medium">
                      {assessment.reason}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {assessment.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
          
          {/* Build My Own Option */}
          <Card 
            className="p-6 cursor-pointer transition-all border-2 border-dashed hover:border-primary/30 hover:bg-accent/50"
            onClick={onBrowseAll}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Build my own
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Start from scratch</h4>
                  <p className="text-muted-foreground">Choose your assessment type and build it your way</p>
                  <p className="text-sm text-blue-600 font-medium">
                    Full control • All assessment types available
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContextualSuggestion;