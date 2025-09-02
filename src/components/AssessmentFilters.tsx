import { useState } from "react";
import { Search, Filter, ChevronDown, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AssessmentFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDetails, setShowFilterDetails] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="min-w-0 w-48">
            <label className="block text-sm font-medium text-foreground mb-1">
              Type
            </label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="formative">Formative</SelectItem>
                <SelectItem value="benchmark">Benchmark</SelectItem>
                <SelectItem value="summative">Summative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-0 w-48">
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <Select defaultValue="created">
              <SelectTrigger className="w-full">
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

          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-foreground mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search in Assessments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button variant="outline" className="h-10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilterDetails(!showFilterDetails)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showFilterDetails ? (
              <>
                <X className="w-4 h-4 mr-1" />
                Show Filter Details
              </>
            ) : (
              "Show Filter Details"
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary">
                Saved Views <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>My Assessments</DropdownMenuItem>
              <DropdownMenuItem>Recent</DropdownMenuItem>
              <DropdownMenuItem>Published Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Save
          </Button>

          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Clear Filters
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span>4 Results</span>
          
          <div className="flex items-center gap-2">
            <span>Sort By</span>
            <Select defaultValue="name">
              <SelectTrigger className="w-auto border-0 p-0 h-auto text-muted-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="modified">Date Modified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="10">
              <SelectTrigger className="w-auto border-0 p-0 h-auto text-muted-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Manage Tags
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFilters;