import { ArrowLeft, CheckCircle, FileText, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContextualSuggestionProps {
  onResponse: (accepted: boolean) => void;
  onBack: () => void;
}

const ContextualSuggestion = ({ onResponse, onBack }: ContextualSuggestionProps) => {
  // Mock recent module data - in real app this would come from context/API
  const recentModule = {
    title: "Linear Equations and Inequalities",
    subject: "Algebra I",
    completedDate: "2 days ago",
    studentsCompleted: 23,
    totalStudents: 27
  };

  const suggestedTemplate = {
    type: "Portfolio",
    description: "Multi-step problem solving with reflection",
    icon: FileText,
    estimatedTime: "45 minutes",
    features: [
      "Real-world application problems",
      "Step-by-step solution process",
      "Self-reflection component",
      "Peer review option"
    ]
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

      {/* Context Recognition */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Smart Suggestion</h2>
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

      {/* Suggestion */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Would you like to assess this concept?
        </h3>
        
        <Card className="p-6 border-2 border-primary/20 bg-primary/5">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <suggestedTemplate.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{suggestedTemplate.type} Assessment</h4>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <p className="text-muted-foreground mb-3">{suggestedTemplate.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Estimated time:</span> {suggestedTemplate.estimatedTime}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">Pre-configured features:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {suggestedTemplate.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={() => onResponse(true)}
          size="lg"
          className="flex-1"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Yes, create this assessment
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onResponse(false)}
          size="lg"
          className="flex-1"
        >
          No, I'll choose something else
        </Button>
      </div>
    </div>
  );
};

export default ContextualSuggestion;