import { useState } from "react";
import { ChevronDown, Plus, Tag, Download, Share, Trash2 } from "lucide-react";
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

  return (
    <div className="space-y-4">
      {selectedItems.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSelected(!showSelected)}
            >
              Show ({selectedItems.length}) Selected Only
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add to
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Add to Collection</DropdownMenuItem>
                <DropdownMenuItem>Add to Course</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-1" />
                  Tag
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Add Tag</DropdownMenuItem>
                <DropdownMenuItem>Remove Tag</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>

            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Distribute
            </Button>

            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
                />
              </TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Standards</TableHead>
              <TableHead className="font-medium">Subject</TableHead>
              <TableHead className="font-medium">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(assessment.id)}
                    onCheckedChange={(checked) => 
                      handleSelectItem(assessment.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-normal text-left"
                  >
                    {assessment.name}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link" 
                    className="p-0 h-auto text-primary font-normal text-left"
                  >
                    {assessment.standards}
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {assessment.subject}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={assessment.type === "Quiz" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {assessment.type}
                  </Badge>
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