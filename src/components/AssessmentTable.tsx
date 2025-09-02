import { useState } from "react";
import { ChevronDown, Plus, Tag, Download, Share, Trash2, BarChart3 } from "lucide-react";
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
  outcomes: string;
  dateAssessed: string;
  type: "Quiz" | "Portfolio" | "Discussion" | "Assignment" | "Video" | "LLM-powered" | "Observation" | "Adaptive" | "Branching";
}

const AssessmentTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSelected, setShowSelected] = useState(false);

  const assessments: Assessment[] = [
    {
      id: "1",
      name: "Cell Structure and Function Quiz",
      outcomes: "BIO.1.2, BIO.1.4, BIO.2.1",
      dateAssessed: "Oct 15, 2024",
      type: "Quiz"
    },
    {
      id: "2", 
      name: "Photosynthesis Lab Assessment",
      outcomes: "BIO.3.1, BIO.3.2, BIO.4.1",
      dateAssessed: "Oct 12, 2024",
      type: "Assignment"
    },
    {
      id: "3",
      name: "Mitosis and Meiosis Portfolio", 
      outcomes: "BIO.2.3, BIO.2.4, BIO.5.1",
      dateAssessed: "Oct 8, 2024",
      type: "Portfolio"
    },
    {
      id: "4",
      name: "Genetics Problem Solving",
      outcomes: "BIO.5.2, BIO.5.3, BIO.6.1",
      dateAssessed: "Oct 5, 2024",
      type: "Discussion"
    },
    {
      id: "5",
      name: "DNA Replication Video Explanation",
      outcomes: "BIO.4.2, BIO.4.3",
      dateAssessed: "Oct 1, 2024",
      type: "Video"
    },
    {
      id: "6",
      name: "Enzyme Function Analysis",
      outcomes: "BIO.3.3, BIO.3.4, BIO.3.5",
      dateAssessed: "Sep 28, 2024",
      type: "LLM-powered"
    },
    {
      id: "7",
      name: "Microscopy Lab Skills",
      outcomes: "BIO.1.1, BIO.1.3",
      dateAssessed: "Sep 25, 2024",
      type: "Observation"
    },
    {
      id: "8",
      name: "Cellular Respiration Adaptive Test",
      outcomes: "BIO.3.6, BIO.3.7, BIO.4.4",
      dateAssessed: "Sep 22, 2024",
      type: "Adaptive"
    },
    {
      id: "9",
      name: "Evolution Case Study Portfolio",
      outcomes: "BIO.6.2, BIO.6.3, BIO.6.4",
      dateAssessed: "Sep 18, 2024",
      type: "Portfolio"
    },
    {
      id: "10",
      name: "Ecology Branching Scenarios",
      outcomes: "BIO.7.1, BIO.7.2, BIO.7.3",
      dateAssessed: "Sep 15, 2024",
      type: "Branching"
    },
    {
      id: "11",
      name: "Molecular Biology Discussion Forum",
      outcomes: "BIO.4.5, BIO.4.6",
      dateAssessed: "Sep 12, 2024",
      type: "Discussion"
    },
    {
      id: "12",
      name: "Plant Biology Field Observation",
      outcomes: "BIO.7.4, BIO.7.5, BIO.8.1",
      dateAssessed: "Sep 8, 2024",
      type: "Observation"
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
              <TableHead className="font-medium">Outcomes</TableHead>
              <TableHead className="font-medium">Date Assessed</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Reports</TableHead>
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
                    {assessment.outcomes}
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {assessment.dateAssessed}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className="text-xs"
                  >
                    {assessment.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
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