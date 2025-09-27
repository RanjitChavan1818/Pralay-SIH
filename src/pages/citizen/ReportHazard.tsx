import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Upload, Wifi, WifiOff, Clock } from "lucide-react";

const ReportHazard = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOnline] = useState(navigator.onLine);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    images: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  const hazardTypes = [
    { value: "tsunami", label: "Tsunami Warning" },
    { value: "storm-surge", label: "Storm Surge" },
    { value: "high-waves", label: "High Waves" },
    { value: "flooding", label: "Coastal Flooding" },
    { value: "debris", label: "Marine Debris" },
    { value: "pollution", label: "Water Pollution" },
    { value: "erosion", label: "Coastal Erosion" },
    { value: "wildlife", label: "Marine Wildlife Issue" },
    { value: "other", label: "Other Hazard" },
  ];

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          toast({
            title: "Location captured",
            description: "GPS coordinates have been added to your report.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + formData.images.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed per report.",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.description) {
      toast({
        title: "Incomplete form",
        description: "Please fill in hazard type and description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isOnline) {
        toast({
          title: "Report submitted",
          description: "Your hazard report has been sent successfully.",
        });
      } else {
        toast({
          title: "Saved offline",
          description: "Report saved locally. Will sync when online.",
          variant: "default",
        });
      }
      
      // Reset form
      setFormData({
        type: "",
        description: "",
        location: "",
        images: [],
      });
      setCurrentLocation(null);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Connection Status */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">Online - Reports sync automatically</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Offline - Reports saved locally</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Report Ocean Hazard</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hazard Type */}
            <div className="space-y-2">
              <Label htmlFor="hazard-type">Hazard Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hazard type" />
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

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what you observed..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="min-h-24"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  placeholder="GPS coordinates or address"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={getCurrentLocation}
                  className="shrink-0"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {currentLocation && (
                <p className="text-sm text-muted-foreground">
                  Current location captured: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Images/Videos (Optional)</Label>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm">Selected files ({formData.images.length}/5):</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.images.map((file, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center space-x-2 pr-1"
                        >
                          <span className="text-xs truncate max-w-20">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-destructive hover:text-destructive/80 ml-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-sunset text-white font-semibold py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  {isOnline ? "Submitting..." : "Saving offline..."}
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportHazard;