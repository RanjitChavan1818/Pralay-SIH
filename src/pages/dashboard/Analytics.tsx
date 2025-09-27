import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar,
  Users,
  AlertTriangle,
  Eye,
  Download
} from "lucide-react";

const Analytics = () => {
  // Mock analytics data
  const stats = {
    totalReports: 247,
    verifiedReports: 189,
    avgResponseTime: "2.4 hours",
    criticalIncidents: 23,
    trendsThisWeek: [
      { day: "Mon", reports: 12, verified: 8 },
      { day: "Tue", reports: 15, verified: 11 },
      { day: "Wed", reports: 8, verified: 6 },
      { day: "Thu", reports: 22, verified: 18 },
      { day: "Fri", reports: 18, verified: 14 },
      { day: "Sat", reports: 25, verified: 19 },
      { day: "Sun", reports: 20, verified: 16 },
    ],
    hotspots: [
      { location: "Santa Monica Beach", reports: 45, severity: "High" },
      { location: "Venice Beach", reports: 32, severity: "Medium" },
      { location: "Malibu Coast", reports: 28, severity: "High" },
      { location: "Manhattan Beach", reports: 19, severity: "Low" },
      { location: "Redondo Beach", reports: 15, severity: "Medium" },
    ],
    hazardTypes: [
      { type: "High Waves", count: 78, percentage: 32 },
      { type: "Marine Debris", count: 52, percentage: 21 },
      { type: "Storm Surge", count: 41, percentage: 17 },
      { type: "Coastal Flooding", count: 35, percentage: 14 },
      { type: "Water Pollution", count: 28, percentage: 11 },
      { type: "Other", count: 13, percentage: 5 },
    ],
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-destructive";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor trends, patterns, and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{stats.totalReports}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">+12% from last week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">{stats.verifiedReports}</div>
                <div className="text-sm text-muted-foreground">Verified Reports</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {Math.round((stats.verifiedReports / stats.totalReports) * 100)}% verification rate
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-success mr-1" />
                  <span className="text-xs text-success">-0.3h improvement</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-destructive">{stats.criticalIncidents}</div>
                <div className="text-sm text-muted-foreground">Critical Incidents</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-destructive mr-1" />
                  <span className="text-xs text-destructive">+3 this week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Weekly Report Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock Chart Visualization */}
              <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-end justify-around p-4">
                {stats.trendsThisWeek.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center space-y-2">
                    <div className="flex flex-col space-y-1">
                      <div 
                        className="w-8 bg-gradient-sunset rounded-t"
                        style={{ height: `${(day.reports / 25) * 100}px` }}
                      />
                      <div 
                        className="w-8 bg-gradient-wave rounded-t"
                        style={{ height: `${(day.verified / 25) * 80}px` }}
                      />
                    </div>
                    <div className="text-xs text-center">
                      <div className="font-medium">{day.day}</div>
                      <div className="text-muted-foreground">{day.reports}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-sunset rounded-full"></div>
                  <span>Total Reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-wave rounded-full"></div>
                  <span>Verified Reports</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hazard Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Hazard Types Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.hazardTypes.map((hazard, index) => (
                <div key={hazard.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{hazard.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{hazard.count}</span>
                      <span className="text-xs text-muted-foreground">({hazard.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-ocean h-2 rounded-full transition-smooth"
                      style={{ width: `${hazard.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotspot Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>High-Activity Locations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.hotspots.map((hotspot, index) => (
              <Card key={hotspot.location} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{hotspot.location}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{hotspot.reports}</span>
                        <span className="text-sm text-muted-foreground">reports</span>
                      </div>
                    </div>
                    <Badge 
                      variant={hotspot.severity === "High" ? "destructive" : 
                              hotspot.severity === "Medium" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {hotspot.severity}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Activity level</span>
                      <span className={getSeverityColor(hotspot.severity)}>
                        {hotspot.severity}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1 mt-2">
                      <div 
                        className={`h-1 rounded-full transition-smooth ${
                          hotspot.severity === "High" ? "bg-destructive" :
                          hotspot.severity === "Medium" ? "bg-warning" : "bg-muted-foreground"
                        }`}
                        style={{ 
                          width: `${hotspot.severity === "High" ? 90 : 
                                   hotspot.severity === "Medium" ? 60 : 30}%` 
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                
                {/* Decorative gradient */}
                <div className={`absolute top-0 right-0 w-1 h-full ${
                  hotspot.severity === "High" ? "bg-gradient-to-b from-destructive to-destructive/50" :
                  hotspot.severity === "Medium" ? "bg-gradient-to-b from-warning to-warning/50" :
                  "bg-gradient-to-b from-muted-foreground to-muted-foreground/50"
                }`} />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm">Response time improved by 15% this month</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm">High wave reports increased by 23%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Citizen engagement up 8% this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Deploy additional resources</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Santa Monica Beach shows consistently high activity
                </p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Review verification process</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Response time for marine debris reports can be improved
                </p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Enhance citizen training</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Quality of storm surge reports could benefit from guidelines
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;