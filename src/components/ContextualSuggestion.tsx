import { ArrowRight, CheckCircle, FileText, Users, Brain, MessageSquare, ScrollText, Video, BarChart3, Plus, RotateCcw, PlusCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContextualSuggestionProps {
  onResponse: (accepted: boolean) => void;
  onBack: () => void;
  onBrowseAll: () => void;
}

const ContextualSuggestion = ({ onResponse, onBack, onBrowseAll }: ContextualSuggestionProps) => {
  // Multiple recently completed modules in Biology 101
  const recentlyCompleted = [
    {
      title: "Cell Structure and Function",
      completedDate: "2 days ago",
      studentsCompleted: 23,
      totalStudents: 27
    },
    {
      title: "Photosynthesis and Cellular Respiration",
      completedDate: "1 week ago", 
      studentsCompleted: 25,
      totalStudents: 27
    },
    {
      title: "DNA Replication and Protein Synthesis",
      completedDate: "2 weeks ago",
      studentsCompleted: 27,
      totalStudents: 27
    }
  ];

  const assessmentOptions = {
    retake: [
      {
        type: "Quiz",
        title: "Photosynthesis Quiz",
        description: "Light-dependent and light-independent reactions",
        icon: ScrollText,
        features: ["Auto-graded problems", "Immediate feedback", "Multiple attempts"],
        detail: "From 'Photosynthesis and Cellular Respiration' • 3 students requested retake"
      },
      {
        type: "Test", 
        title: "Cell Organelles Test",
        description: "Structure and function of cellular components",
        icon: FileText,
        features: ["Multiple choice", "Short answer", "Diagram labeling"],
        detail: "From 'Cell Structure and Function' • 5 students requested retake"
      },
      {
        type: "Quiz",
        title: "DNA Structure Quiz", 
        description: "Nucleotide composition and base pairing",
        icon: ScrollText,
        features: ["Interactive diagrams", "Immediate scoring", "Hint system"],
        detail: "From 'DNA Replication and Protein Synthesis' • 2 students requested retake"
      }
    ],
    assess: [
      {
        type: "Portfolio",
        title: "Cell Structure Lab Report Assessment",
        description: "Microscopy observations and analysis",
        icon: FileText,
        features: ["Real-world application", "Scientific writing", "Data interpretation"],
        detail: "From 'Cell Structure and Function' lab • 27 students submitted"
      },
      {
        type: "Discussion",
        title: "Photosynthesis vs Cellular Respiration",
        description: "Compare and contrast energy processes",
        icon: MessageSquare,
        features: ["Peer comparison", "Process analysis", "Energy flow concepts"],
        detail: "From 'Photosynthesis and Cellular Respiration' • 25 students participated"
      },
      {
        type: "Project",
        title: "DNA Mutation Case Study",
        description: "Analyze real genetic disorders",
        icon: Brain,
        features: ["Case-based learning", "Research component", "Presentation element"],
        detail: "From 'DNA Replication and Protein Synthesis' • Research presentations due"
      }
    ],
    duplicate: [
      {
        type: "Quiz",
        title: "Mitosis Quiz Template",
        description: "Cell division phases and checkpoints",
        icon: ScrollText,
        features: ["Visual diagrams", "Phase identification", "Process sequencing"],
        detail: "Built 3 days ago • High student engagement (92% completion)"
      },
      {
        type: "Test",
        title: "Biology Unit Test Template",
        description: "Comprehensive cellular biology assessment",
        icon: FileText,
        features: ["Outcomes aligned", "Mixed question types", "Detailed rubric"],
        detail: "Built last week • Used by 3 other instructors"
      },
      {
        type: "Portfolio",
        title: "Lab Report Portfolio Template",
        description: "Scientific method and data analysis framework",
        icon: Users,
        features: ["Structured format", "Reflection prompts", "Peer review component"],
        detail: "Built 2 weeks ago • Improved student writing by 15%"
      }
    ],
    scratch: [
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
    ]
  };

  const renderAssessmentCard = (assessment: any, index: number, isFromScratch = false) => (
    <Card 
      key={assessment.title || assessment.type}
      className={`p-6 cursor-pointer transition-all border-2 hover:shadow-md ${
        index === 0 && !isFromScratch
          ? 'border-primary/20 bg-primary/5 hover:border-primary/40' 
          : 'border-border hover:border-primary/30 hover:bg-accent/50'
      }`}
      onClick={() => onResponse(true)}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          index === 0 && !isFromScratch ? 'bg-primary/10' : 'bg-accent'
        }`}>
          <assessment.icon className={`w-6 h-6 ${
            index === 0 && !isFromScratch ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-lg font-semibold text-foreground">
              {assessment.title || assessment.type}
            </h4>
            {index === 0 && !isFromScratch && <Badge variant="secondary">Recommended</Badge>}
          </div>
          <p className="text-muted-foreground mb-3">{assessment.description}</p>
          
          {assessment.detail && (
            <p className="text-sm text-emerald-600 font-medium mb-2">{assessment.detail}</p>
          )}
          
          <div className="space-y-2">
            {assessment.reason && (
              <div className="text-sm text-primary font-medium">
                {assessment.reason}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {assessment.features.map((feature: string, featureIndex: number) => (
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
  );

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

        {/* Recently Completed Items */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-foreground">Recently completed</span>
          </div>
          <div className="grid gap-3">
            {recentlyCompleted.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                <div>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Completed {item.completedDate}</span>
                    <span>{item.studentsCompleted}/{item.totalStudents} students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <Tabs defaultValue="scratch" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            What would you like to do?
          </h3>
        </div>
        
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="retake" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Retake
          </TabsTrigger>
          <TabsTrigger value="assess" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Assess
          </TabsTrigger>
          <TabsTrigger value="duplicate" className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Duplicate
          </TabsTrigger>
          <TabsTrigger value="scratch" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Start from Scratch
          </TabsTrigger>
        </TabsList>

        <TabsContent value="retake" className="space-y-4 mt-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">Give students another chance with these previously assessed concepts</p>
            <div className="grid gap-4">
              {assessmentOptions.retake.map((assessment, index) => 
                renderAssessmentCard(assessment, index)
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assess" className="space-y-4 mt-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">Create assessments based on recently completed activities</p>
            <div className="grid gap-4">
              {assessmentOptions.assess.map((assessment, index) => 
                renderAssessmentCard(assessment, index)
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="duplicate" className="space-y-4 mt-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">Reuse and customize your previous successful assessments</p>
            <div className="grid gap-4">
              {assessmentOptions.duplicate.map((assessment, index) => 
                renderAssessmentCard(assessment, index)
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scratch" className="space-y-4 mt-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">Build a new assessment from the ground up</p>
            
            {/* Primary "Build My Own" Card */}
            <Card 
              className="p-6 cursor-pointer transition-all border-2 border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 mb-6"
              onClick={onBrowseAll}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Primary Option</Badge>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">Build My Own</h4>
                    <p className="text-muted-foreground">Choose your assessment type and build it your way</p>
                    <p className="text-sm text-primary font-medium">
                      Full control • All assessment types available
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </Card>

            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-foreground mb-3">Or start with a template:</h4>
              <div className="grid gap-4">
                {assessmentOptions.scratch.map((assessment, index) => 
                  renderAssessmentCard(assessment, index, true)
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContextualSuggestion;