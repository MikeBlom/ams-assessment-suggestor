import { useState } from "react";
import { ChevronDown, Plus, Tag, Download, Share, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Assessment {
  id: string;
  name: string;
  standards: string;
  subject: string;
  type: "Quiz" | "Assignment" | "Discussion" | "Portfolio" | "Video" | "Observation with Rubric";
}

const AssessmentTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSelected, setShowSelected] = useState(false);

  const assessments: Assessment[] = [
    {
      id: "1",
      name: "Cell Structure and Function Assessment",
      standards: "HS.BIO.1.1, HS.BIO.1.2, HS.BIO.1.3",
      subject: "Biology",
      type: "Quiz"
    },
    {
      id: "2", 
      name: "Photosynthesis Lab Report",
      standards: "HS.BIO.2.1, HS.BIO.2.2",
      subject: "Biology",
      type: "Assignment"
    },
    {
      id: "3",
      name: "DNA Replication Process Quiz", 
      standards: "HS.BIO.3.1, HS.BIO.3.2, HS.BIO.3.3",
      subject: "Biology",
      type: "Quiz"
    },
    {
      id: "4",
      name: "Ecosystem Dynamics Discussion",
      standards: "HS.BIO.4.1, HS.BIO.4.2", 
      subject: "Biology",
      type: "Discussion"
    },
    {
      id: "5",
      name: "Protein Synthesis Video Explanation",
      standards: "HS.BIO.3.4, HS.BIO.3.5",
      subject: "Biology",
      type: "Video"
    },
    {
      id: "6",
      name: "Mitosis and Meiosis Comparison",
      standards: "HS.BIO.3.6, HS.BIO.3.7",
      subject: "Biology",
      type: "Assignment"
    },
    {
      id: "7",
      name: "Evolution Evidence Portfolio",
      standards: "HS.BIO.5.1, HS.BIO.5.2, HS.BIO.5.3",
      subject: "Biology",
      type: "Portfolio"
    },
    {
      id: "8",
      name: "Enzyme Activity Lab Performance",
      standards: "HS.BIO.2.3, HS.BIO.2.4",
      subject: "Biology",
      type: "Observation with Rubric"
    },
    {
      id: "9",
      name: "Genetics Problem Solving Quiz",
      standards: "HS.BIO.3.8, HS.BIO.3.9",
      subject: "Biology",
      type: "Quiz"
    },
    {
      id: "10",
      name: "Cellular Respiration Pathway Analysis",
      standards: "HS.BIO.2.5, HS.BIO.2.6",
      subject: "Biology",
      type: "Assignment"
    },
    {
      id: "11",
      name: "Biodiversity Conservation Discussion",
      standards: "HS.BIO.4.3, HS.BIO.4.4",
      subject: "Biology",
      type: "Discussion"
    },
    {
      id: "12",
      name: "Molecular Biology Techniques Portfolio",
      standards: "HS.BIO.6.1, HS.BIO.6.2",
      subject: "Biology",
      type: "Portfolio"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(assessments.map(a => a.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const allSelected = selectedItems.length === assessments.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < assessments.length;

  const filteredAssessments = showSelected 
    ? assessments.filter(a => selectedItems.includes(a.id))
    : assessments;

  const getTypeColor = (type: string) => {
    const colors = {
      'Quiz': 'bg-blue-100 text-blue-800',
      'Assignment': 'bg-green-100 text-green-800', 
      'Discussion': 'bg-purple-100 text-purple-800',
      'Portfolio': 'bg-orange-100 text-orange-800',
      'Video': 'bg-red-100 text-red-800',
      'Observation with Rubric': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSelected(!showSelected)}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                {showSelected ? 'Show All' : 'Show Selected'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                Add to Collection
              </Button>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                Add to Course
              </Button>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                Tag
              </Button>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                Export
              </Button>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                Distribute
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all assessments"
                />
              </TableHead>
              <TableHead className="font-medium text-gray-700">Assessment Name</TableHead>
              <TableHead className="font-medium text-gray-700">Standards</TableHead>
              <TableHead className="font-medium text-gray-700">Subject</TableHead>
              <TableHead className="font-medium text-gray-700">Type</TableHead>
              <TableHead className="w-24 font-medium text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.map((assessment) => (
              <TableRow key={assessment.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(assessment.id)}
                    onCheckedChange={(checked) => handleSelectItem(assessment.id, checked as boolean)}
                    aria-label={`Select ${assessment.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-900">{assessment.name}</TableCell>
                <TableCell className="text-gray-600">
                  {assessment.standards}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {assessment.subject}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(assessment.type)}`}>
                    {assessment.type}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssessmentTable;