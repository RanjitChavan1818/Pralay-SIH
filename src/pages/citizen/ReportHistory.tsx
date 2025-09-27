import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Search, Upload, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const ReportHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const reports = [
    {
      id: "R001",
      type: "High Waves",
      description: "Dangerous waves hitting the shoreline, estimated 4-5 meters high",
      location: "Santa Monica Beach, CA",
      date: "2024-01-15",
      time: "14:30",
      status: "verified" as const,
      images: 2,
      syncStatus: "synced" as const,
    },
    {
      id: "R002", 
      type: "Marine Debris",
      description: "Large plastic debris washing ashore, potential navigation hazard",
      location: "Malibu Coast, CA",
      date: "2024-01-12",
      time: "09:15",
      status: "pending" as const,
      images: 3,
      syncStatus: "synced" as const,
    },
    {
      id: "R003",
      type: "Coastal Flooding",
      description: "Parking lot flooded during high tide, affecting beach access",
      location: "Venice Beach, CA",
      date: "2024-01-10",
      time: "16:45",
      status: "discarded" as const,
      images: 1,
      syncStatus: "pending" as const,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "discarded":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Under Review";
      case "discarded":
        return "Not Confirmed";
      default:
        return "Unknown";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default" as const;
      case "pending":
        return "secondary" as const;
      case "discarded":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const filteredReports = reports.filter(report =>
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Report History</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{reports.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {reports.filter(r => r.status === "verified").length}
              </div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {reports.filter(r => r.syncStatus === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Sync</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                {searchTerm ? "No reports match your search." : "No reports found. Start by creating your first report!"}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-wave transition-wave">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{report.type}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.date} at {report.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant={getStatusVariant(report.status)} className="flex items-center space-x-1">
                      {getStatusIcon(report.status)}
                      <span>{getStatusLabel(report.status)}</span>
                    </Badge>
                    {report.syncStatus === "pending" && (
                      <Badge variant="outline" className="text-xs">
                        <Upload className="h-3 w-3 mr-1" />
                        Pending sync
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {report.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    ID: {report.id} • {report.images} {report.images === 1 ? 'image' : 'images'}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportHistory;