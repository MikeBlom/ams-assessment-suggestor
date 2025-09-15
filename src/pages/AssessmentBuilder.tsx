import { useState } from "react";
import { ArrowLeft, Save, Eye, Settings, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearchParams } from "react-router-dom";

const AssessmentBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentType = searchParams.get('type') || 'lab-report';
  
  const [title, setTitle] = useState("Photosynthesis Lab Report");
  const [description, setDescription] = useState("Students will design and conduct an experiment to investigate the factors affecting photosynthesis rate, then compile their findings into a comprehensive lab report.");

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Hypothesis",
      description: "State your prediction about how light intensity will affect photosynthesis rate",
      required: true,
      type: "text"
    },
    {
      id: 2,
      title: "Materials & Methods",
      description: "List all materials used and describe your experimental procedure step-by-step",
      required: true,
      type: "text"
    },
    {
      id: 3,
      title: "Data Collection",
      description: "Record your observations and measurements in organized tables or charts",
      required: true,
      type: "data-table"
    },
    {
      id: 4,
      title: "Results & Analysis",
      description: "Analyze your data and create graphs to visualize the relationship between variables",
      required: true,
      type: "text"
    },
    {
      id: 5,
      title: "Conclusion",
      description: "Summarize your findings and explain whether your hypothesis was supported",
      required: true,
      type: "text"
    },
    {
      id: 6,
      title: "Reflection Questions",
      description: "Answer questions about experimental limitations and real-world applications",
      required: false,
      type: "questions"
    }
  ]);

  const handleBack = () => {
    navigate('/assessments');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Assessment Builder</h1>
                <p className="text-sm text-muted-foreground">Lab Report Template</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Assessment Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Sections */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Report Sections</h2>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>

              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 cursor-move text-muted-foreground">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Section {index + 1}
                            </span>
                            {section.required && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="text-muted-foreground">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <Input 
                            value={section.title}
                            className="font-medium"
                            placeholder="Section title"
                          />
                        </div>
                        <div>
                          <Textarea 
                            value={section.description}
                            className="text-sm"
                            placeholder="Instructions for students"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Preview */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Template Preview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>Lab Report</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sections:</span>
                  <span>{sections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Required:</span>
                  <span>{sections.filter(s => s.required).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Time:</span>
                  <span>45-60 min</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Add Rubric
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Set Due Date
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Add Resources
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Enable Peer Review
                </Button>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Template Tips</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Use clear, specific instructions for each section</p>
                <p>• Consider adding word count requirements</p>
                <p>• Include example data or formatting</p>
                <p>• Set realistic time expectations</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssessmentBuilder;