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
    totalStudents: 27
  };

  const smartSuggestions = [
    {
      type: "Recently assessed concepts",
      title: "Retake: Photosynthesis Quiz",
      description: "Allow students to reassess photosynthesis concepts",
      icon: ScrollText,
      context: "Last assessed 1 week ago • 3 students requested retake",
      action: () => onResponse(true)
    },
    {
      type: "Recently completed assignments",
      title: "Assess: Cell Structure Lab Report",
      description: "Create follow-up assessment for lab completion",
      icon: FileText,
      context: "Lab completed 2 days ago • 27 students submitted",
      action: () => onResponse(true)
    },
    {
      type: "Last assessment built",
      title: "Duplicate: Mitosis Quiz Template",
      description: "Use your successful mitosis quiz structure",
      icon: Brain,
      context: "Built 3 days ago • High student engagement",
      action: () => onResponse(true)
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
            </div>
          </div>
        </Card>
      </div>

      {/* Smart Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Quick start options
        </h3>
        
        <div className="grid gap-4">
          {smartSuggestions.map((suggestion, index) => (
            <Card 
              key={index}
              className="p-6 cursor-pointer transition-all border-2 hover:border-primary/30 hover:bg-accent/50 hover:shadow-md"
              onClick={suggestion.action}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <suggestion.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {suggestion.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{suggestion.title}</h4>
                    <p className="text-muted-foreground">{suggestion.description}</p>
                    <p className="text-sm text-primary font-medium">
                      {suggestion.context}
                    </p>
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