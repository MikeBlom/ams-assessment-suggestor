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
  core: string;
  standards: string;
  subject: string;
  type: "Formative" | "Benchmark";
  creator: string;
}

const AssessmentTable = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSelected, setShowSelected] = useState(false);

  const assessments: Assessment[] = [
    {
      id: "1",
      name: "Mathematical Aptitude Assessment",
      core: "UT:Core Standards 2025",
      standards: "XX.XXXX.XX, XX.X.XX, XX.XXXX.XX, XX.XX...",
      subject: "Math",
      type: "Formative",
      creator: "Devon Hailey"
    },
    {
      id: "2", 
      name: "Scientific Understanding Evaluation",
      core: "UT:Core Standards 2025",
      standards: "XX.XXXX.XX, XX.X.XX, XX.XXXX.XX, XX.XX...",
      subject: "Science",
      type: "Formative",
      creator: "Devon Hailey"
    },
    {
      id: "3",
      name: "Science Exploration Challenge", 
      core: "UT:Core Standards 2016",
      standards: "XX.XXXX.XX, XX.X.XX, XX.XXXX.XX, XX.XX...",
      subject: "Language Arts",
      type: "Benchmark",
      creator: "Devon Hailey"
    },
    {
      id: "4",
      name: "Tech Innovation Assessment",
      core: "UT:Core Standards 2016", 
      standards: "XX.XXXX.XX, XX.X.XX, XX.XXXX.XX, XX.XX...",
      subject: "Science",
      type: "Benchmark",
      creator: "Devon Hailey"
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
              <TableHead className="font-medium">Core</TableHead>
              <TableHead className="font-medium">Standards</TableHead>
              <TableHead className="font-medium">Subject</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Creator</TableHead>
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
                <TableCell className="text-muted-foreground">
                  {assessment.core}
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
                    variant={assessment.type === "Formative" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {assessment.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                      DH
                    </div>
                    {assessment.creator}
                  </div>
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