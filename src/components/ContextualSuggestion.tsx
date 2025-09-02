import { ArrowRight, CheckCircle, FileText, Users, Brain, MessageSquare, ScrollText, Video, BarChart3, Plus, RotateCcw, PlusCircle, Copy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ContextualSuggestionProps {
  onResponse: (accepted: boolean) => void;
  onBack: () => void;
  onBrowseAll: () => void;
}

const ContextualSuggestion = ({ onResponse, onBack, onBrowseAll }: ContextualSuggestionProps) => {
  const [selectedContext, setSelectedContext] = useState("Cell Structure and Function");
  
  // Different types of recent activity items
  const recentActivities = [
    {
      type: "Recently completed",
      icon: CheckCircle,
      title: "Cell Structure and Function",
      detail: "Completed 2 days ago • 23/27 students",
      color: "emerald"
    },
    {
      type: "Recently assessed",
      icon: RotateCcw,
      title: "Photosynthesis Quiz",
      detail: "Last assessed 1 week ago • 3 students requested retake",
      color: "blue"
    },
    {
      type: "Recently completed assignment",
      icon: FileText,
      title: "DNA Lab Report",
      detail: "Lab completed 3 days ago • 27 students submitted",
      color: "purple"
    },
    {
      type: "Last assessment built",
      icon: Copy,
      title: "Mitosis Quiz Template",
      detail: "Built 3 days ago • High engagement (92% completion)",
      color: "orange"
    }
  ];

  // Context-specific template options
  const contextualTemplates = {
    "Cell Structure and Function": [
      {
        type: "Portfolio",
        title: "Cell Organelle Analysis",
        description: "Multi-step microscopy and function analysis",
        icon: FileText,
        features: ["Microscopy skills", "Function analysis", "Scientific writing"],
        reason: "Perfect for hands-on cell structure learning"
      },
      {
        type: "Quiz",
        title: "Organelle Functions Quiz",
        description: "Interactive assessment of cellular components",
        icon: ScrollText,
        features: ["Drag-and-drop labeling", "Function matching", "Auto-graded"],
        reason: "Most effective for structure-function relationships"
      },
      {
        type: "Discussion", 
        title: "Cell Theory Debate",
        description: "Historical perspectives on cell discovery",
        icon: MessageSquare,
        features: ["Historical analysis", "Peer discussion", "Critical thinking"],
        reason: "Great for conceptual understanding"
      }
    ],
    "Photosynthesis and Cellular Respiration": [
      {
        type: "Portfolio",
        title: "Energy Flow Analysis",
        description: "Multi-step energy transformation tracking",
        icon: FileText,
        features: ["Process diagrams", "Energy calculations", "Real-world applications"],
        reason: "Perfect for understanding energy conversions"
      },
      {
        type: "Quiz",
        title: "Light/Dark Reactions Quiz", 
        description: "Comprehensive photosynthesis assessment",
        icon: ScrollText,
        features: ["Process sequencing", "Molecule tracking", "Location identification"],
        reason: "Most used for photosynthesis concepts"
      },
      {
        type: "Test",
        title: "Cellular Respiration Test",
        description: "Complete ATP production pathway assessment",
        icon: Brain,
        features: ["Multi-step processes", "Enzyme functions", "Energy yield calculations"],
        reason: "Comprehensive coverage of respiration"
      }
    ],
    "DNA Replication and Protein Synthesis": [
      {
        type: "Project",
        title: "Genetic Mutation Case Study",
        description: "Real-world genetic disorder analysis",
        icon: Users,
        features: ["Case analysis", "Research component", "Presentation element"],
        reason: "Perfect for applied genetics learning"
      },
      {
        type: "Quiz",
        title: "Central Dogma Quiz",
        description: "DNA to protein pathway assessment", 
        icon: ScrollText,
        features: ["Step sequencing", "Codon translation", "Error identification"],
        reason: "Most effective for process understanding"
      },
      {
        type: "Discussion",
        title: "Genetic Engineering Ethics",
        description: "Modern biotechnology implications",
        icon: MessageSquare,
        features: ["Ethical reasoning", "Current events", "Peer perspectives"],
        reason: "Great for contemporary applications"
      }
    ]
  };

  const renderAssessmentCard = (assessment: any, index: number) => (
    <Card 
      key={assessment.title}
      className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
        index === 0
          ? 'border-primary/20 bg-primary/5 hover:border-primary/40' 
          : 'border-border hover:border-primary/30 hover:bg-accent/50'
      }`}
      onClick={() => onResponse(true)}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          index === 0 ? 'bg-primary/10' : 'bg-accent'
        }`}>
          <assessment.icon className={`w-5 h-5 ${
            index === 0 ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-foreground">{assessment.title}</h4>
            {index === 0 && <Badge variant="secondary" className="text-xs">Recommended</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{assessment.description}</p>
          
          <div className="space-y-1">
            <div className="text-xs text-primary font-medium">
              {assessment.reason}
            </div>
            <div className="flex flex-wrap gap-1">
              {assessment.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                <Badge key={featureIndex} variant="outline" className="text-xs px-1 py-0">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </Card>
  );

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-700",
      blue: "bg-blue-100 text-blue-700", 
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700"
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

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

        {/* Recent Activities with specific indicators */}
        <div className="grid gap-3">
          {recentActivities.map((item, index) => (
            <Card 
              key={index} 
              className={`p-3 cursor-pointer transition-all border ${
                item.title === selectedContext 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'border-border hover:border-primary/30 hover:bg-accent/50'
              }`}
              onClick={() => setSelectedContext(item.title)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                  </div>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                {item.title === selectedContext && <CheckCircle className="w-4 h-4 text-primary" />}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Contextual Templates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Ready-to-use templates for "{selectedContext}"
          </h3>
          <Button variant="outline" size="sm" onClick={onBrowseAll}>
            <Plus className="w-4 h-4 mr-1" />
            Build My Own
          </Button>
        </div>
        
        <div className="grid gap-3">
          {(contextualTemplates[selectedContext as keyof typeof contextualTemplates] || []).map((assessment, index) => 
            renderAssessmentCard(assessment, index)
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextualSuggestion;