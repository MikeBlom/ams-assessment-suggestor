import { ArrowRight, CheckCircle, FileText, Users, Brain, MessageSquare, ScrollText, Video } from "lucide-react";
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
    title: "Linear Equations and Inequalities",
    subject: "Algebra I",
    completedDate: "2 days ago",
    studentsCompleted: 23,
    totalStudents: 27
  };

  const suggestedAssessments = [
    {
      type: "Portfolio",
      description: "Multi-step problem solving with reflection",
      icon: FileText,
      estimatedTime: "45 minutes",
      features: ["Real-world application problems", "Step-by-step solution process", "Self-reflection component"],
      recommended: true
    },
    {
      type: "Discussion",
      description: "Collaborative analysis of problem-solving approaches",
      icon: MessageSquare,
      estimatedTime: "30 minutes",
      features: ["Peer problem comparison", "Strategy discussion", "Group insights"],
      recommended: false
    },
    {
      type: "Quiz",
      description: "Mixed question types testing core concepts",
      icon: ScrollText,
      estimatedTime: "25 minutes", 
      features: ["Auto-graded problems", "Immediate feedback", "Multiple attempts"],
      recommended: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Context Recognition */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Smart Assessment Suggestions</h2>
            <p className="text-muted-foreground">Based on your recent teaching activity</p>
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
            </div>
          </div>
        </Card>
      </div>

      {/* Suggested Assessments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Ready-to-use assessments for "{recentModule.title}"
        </h3>
        
        <div className="grid gap-4">
          {suggestedAssessments.map((assessment, index) => (
            <Card 
              key={index}
              className={`p-6 cursor-pointer transition-all border-2 hover:shadow-md ${
                assessment.recommended 
                  ? 'border-primary/20 bg-primary/5 hover:border-primary/40' 
                  : 'border-border hover:border-primary/30 hover:bg-accent/50'
              }`}
              onClick={() => onResponse(true)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  assessment.recommended ? 'bg-primary/10' : 'bg-accent'
                }`}>
                  <assessment.icon className={`w-6 h-6 ${
                    assessment.recommended ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{assessment.type}</h4>
                    {assessment.recommended && <Badge variant="secondary">Recommended</Badge>}
                  </div>
                  <p className="text-muted-foreground mb-3">{assessment.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Estimated time:</span> {assessment.estimatedTime}
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
        </div>
      </div>

      {/* Browse All Option */}
      <div className="pt-4 border-t border-border">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Don't see what you need?
          </p>
          <Button 
            variant="outline" 
            onClick={onBrowseAll}
            size="lg"
            className="w-full"
          >
            Browse all assessment types
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContextualSuggestion;