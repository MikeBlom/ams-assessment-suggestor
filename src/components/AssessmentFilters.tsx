import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, Settings } from "lucide-react";

const AssessmentFilters = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Type</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="discussion">Discussion</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="observation">Observation with Rubric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <Select defaultValue="created">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Subject</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search assessments..." 
              className="pl-10 w-[200px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          7 assessments
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-sm">
            Bulk Actions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFilters;