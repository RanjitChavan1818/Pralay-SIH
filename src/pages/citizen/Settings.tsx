import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, 
  MapPin, 
  Bell, 
  Camera, 
  Wifi, 
  Trash2, 
  Download,
  Info,
  Shield
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    language: "en",
    autoLocation: true,
    notifications: true,
    autoSync: true,
    highQualityImages: false,
    offlineReports: true,
  });

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "pt", label: "Português" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
  ];

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: "Your preferences have been saved.",
    });
  };

  const clearOfflineData = () => {
    // Mock clearing offline data
    toast({
      title: "Offline data cleared",
      description: "All locally stored reports have been removed.",
    });
  };

  const exportData = () => {
    // Mock data export
    toast({
      title: "Data exported",
      description: "Your report data has been downloaded.",
    });
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your reporting preferences</p>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Language & Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Display Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSettingChange("language", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-capture Location</Label>
              <p className="text-sm text-muted-foreground">
                Automatically add GPS coordinates to reports
              </p>
            </div>
            <Switch
              checked={settings.autoLocation}
              onCheckedChange={(value) => handleSettingChange("autoLocation", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your reports
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(value) => handleSettingChange("notifications", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-primary" />
            <span>Data & Sync</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-sync Reports</Label>
              <p className="text-sm text-muted-foreground">
                Automatically upload reports when online
              </p>
            </div>
            <Switch
              checked={settings.autoSync}
              onCheckedChange={(value) => handleSettingChange("autoSync", value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>High Quality Images</Label>
              <p className="text-sm text-muted-foreground">
                Upload full resolution images (uses more data)
              </p>
            </div>
            <Switch
              checked={settings.highQualityImages}
              onCheckedChange={(value) => handleSettingChange("highQualityImages", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-primary" />
            <span>Media</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Store Photos Offline</Label>
              <p className="text-sm text-muted-foreground">
                Keep photos locally until synced
              </p>
            </div>
            <Switch
              checked={settings.offlineReports}
              onCheckedChange={(value) => handleSettingChange("offlineReports", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-primary" />
            <span>Data Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={exportData}
            className="w-full justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
          
          <Button
            variant="destructive"
            onClick={clearOfflineData}
            className="w-full justify-start"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Offline Data
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>About</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Build</span>
            <span>2024.01.15</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage Used</span>
            <span>12.3 MB</span>
          </div>
          
          <Separator className="my-4" />
          
          <Button variant="ghost" className="w-full justify-start p-0 h-auto">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Policy
          </Button>
          
          <Button variant="ghost" className="w-full justify-start p-0 h-auto">
            <Info className="h-4 w-4 mr-2" />
            Terms of Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;