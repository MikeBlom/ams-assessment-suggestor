import { useState } from "react";
import { Check, Plus, GripVertical, Settings, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface LabReportTemplateProps {
  onComplete: () => void;
  onBack: () => void;
}

const LabReportTemplate = ({ onComplete, onBack }: LabReportTemplateProps) => {
  const [title, setTitle] = useState("Photosynthesis Lab Report");
  const [description, setDescription] = useState("Students will investigate the factors affecting photosynthesis rate and compile their findings into a comprehensive lab report.");
  
  const [sections] = useState([
    {
      id: 1,
      title: "Hypothesis Formation",
      description: "State your prediction about how light intensity will affect the rate of photosynthesis",
      required: true,
      estimatedTime: "5 min"
    },
    {
      id: 2,
      title: "Materials & Methods",
      description: "List all materials used and describe your experimental procedure step-by-step",
      required: true,
      estimatedTime: "10 min"
    },
    {
      id: 3,
      title: "Data Collection & Observations",
      description: "Record your measurements and observations in organized tables or charts",
      required: true,
      estimatedTime: "15 min"
    },
    {
      id: 4,
      title: "Results & Analysis",
      description: "Analyze your data and create graphs to visualize the relationship between variables",
      required: true,
      estimatedTime: "10 min"
    },
    {
      id: 5,
      title: "Conclusion & Reflection",
      description: "Summarize your findings and explain whether your hypothesis was supported",
      required: true,
      estimatedTime: "10 min"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Photosynthesis Lab Report Template
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on your Cell Biology module
            </p>
          </div>
        </div>
      </div>

      {/* Template Overview */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="space-y-3">
          <div>
            <Label htmlFor="template-title" className="text-sm font-medium">Assessment Title</Label>
            <Input 
              id="template-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 bg-white"
            />
          </div>
          <div>
            <Label htmlFor="template-description" className="text-sm font-medium">Description</Label>
            <Textarea 
              id="template-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 bg-white"
              rows={2}
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>50 minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Individual work</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Lab Report
            </Badge>
          </div>
        </div>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Report Sections</h3>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Section
          </Button>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={section.id} className="border border-border rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3">
                <div className="mt-1 cursor-move text-muted-foreground">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Section {index + 1}
                      </span>
                      {section.required && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {section.estimatedTime}
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-muted-foreground h-6 w-6 p-0">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <Input 
                      value={section.title}
                      className="font-medium text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Textarea 
                      value={section.description}
                      className="text-sm resize-none"
                      rows={2}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Suggestions
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700 text-white">
            Create Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LabReportTemplate;