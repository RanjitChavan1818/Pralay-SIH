import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Map as MapIcon, 
  Filter, 
  Search, 
  MapPin, 
  Calendar,
  Clock,
  Camera,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  Layers
} from "lucide-react";

const HazardMap = () => {
  const [filters, setFilters] = useState({
    hazardType: "all",
    status: "all",
    dateRange: "7d",
    source: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock data for map markers
  const reports = [
    {
      id: "R001",
      type: "High Waves",
      location: "Santa Monica Beach",
      coordinates: [34.0195, -118.4912],
      status: "verified",
      source: "citizen",
      reportedBy: "Sarah Johnson",
      date: "2024-01-15",
      time: "14:30",
      description: "Dangerous waves hitting the shoreline, estimated 4-5 meters high",
      images: 2,
      severity: "high",
    },
    {
      id: "R002",
      type: "Marine Debris",
      location: "Malibu Coast",
      coordinates: [34.0259, -118.7798],
      status: "pending",
      source: "citizen",
      reportedBy: "Mike Chen",
      date: "2024-01-14",
      time: "09:15",
      description: "Large plastic debris washing ashore, potential navigation hazard",
      images: 3,
      severity: "medium",
    },
    {
      id: "R003",
      type: "Storm Surge",
      location: "Venice Beach",
      coordinates: [33.9850, -118.4695],
      status: "verified",
      source: "social_media",
      reportedBy: "Twitter @OceanWatch",
      date: "2024-01-13",
      time: "16:45",
      description: "Storm surge affecting coastal infrastructure",
      images: 1,
      severity: "high",
    },
    {
      id: "R004",
      type: "Water Pollution",
      location: "Redondo Beach",
      coordinates: [33.8436, -118.3915],
      status: "discarded",
      source: "citizen",
      reportedBy: "Lisa Martinez",
      date: "2024-01-12",
      time: "11:20",
      description: "Discolored water observed near pier",
      images: 4,
      severity: "low",
    },
  ];

  const hazardTypes = [
    { value: "all", label: "All Hazards" },
    { value: "tsunami", label: "Tsunami" },
    { value: "storm-surge", label: "Storm Surge" },
    { value: "high-waves", label: "High Waves" },
    { value: "flooding", label: "Flooding" },
    { value: "debris", label: "Marine Debris" },
    { value: "pollution", label: "Pollution" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="status-verified text-xs">Verified</Badge>;
      case "pending":
        return <Badge className="status-pending text-xs">Pending</Badge>;
      case "discarded":
        return <Badge className="status-discarded text-xs">Discarded</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapIcon className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{reports.length}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">
                  {reports.filter(r => r.status === "verified").length}
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">
                  {reports.filter(r => r.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.severity === "high").length}
                </div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapIcon className="h-5 w-5" />
                <span>Hazard Locations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[540px] relative">
              {/* Placeholder for Interactive Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Layers className="h-16 w-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Interactive Map View</h3>
                    <p className="text-muted-foreground">
                      Leaflet.js map integration will display here
                    </p>
                  </div>
                  
                  {/* Mock markers visualization */}
                  <div className="flex justify-center space-x-4 mt-8">
                    {reports.slice(0, 3).map((report, index) => (
                      <div
                        key={report.id}
                        className={`
                          w-4 h-4 rounded-full cursor-pointer animate-pulse-glow
                          ${report.status === "verified" ? "bg-success" :
                            report.status === "pending" ? "bg-warning" : "bg-destructive"}
                        `}
                        style={{
                          animationDelay: `${index * 0.5}s`
                        }}
                        onClick={() => setSelectedReport(report)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Report Details */}
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Location</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hazard Type</Label>
                <Select
                  value={filters.hazardType}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, hazardType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hazardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="discarded">Discarded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="outline">
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Selected Report Details */}
          {selectedReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Report Details</span>
                  {getStatusBadge(selectedReport.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{selectedReport.type}</h4>
                  <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReport.date} at {selectedReport.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReport.reportedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReport.images} images</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedReport.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Severity:</span>
                    <span className={`text-sm font-medium ${getSeverityColor(selectedReport.severity)}`}>
                      {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Full Report
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HazardMap;