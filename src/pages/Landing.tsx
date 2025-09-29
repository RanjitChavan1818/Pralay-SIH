import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Shield, Users, MapPin } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-ocean flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-gentle-float">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Ocean Hazard
              <br />
              <span className="bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Reporting Platform
              </span>
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Empowering communities to report ocean hazards and enabling officials to respond effectively. 
            Together, we protect our coastal environments.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Citizen Card */}
          <Card className="glass-ocean border-white/20 hover:shadow-wave transition-wave group cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-wave">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gradient-sunset">Citizen Reporter</CardTitle>
              <CardDescription className="text-gradient-sunset/80 text-lg">
                Report ocean hazards from your mobile device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gradient-sunset/90">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>GPS location tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Photo & video uploads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Offline reporting capability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Multilingual support</span>
                </li>
              </ul>
              <Link to="/citizen" className="block">
                <Button className="w-full bg-gradient-sunset border-0 text-white font-semibold py-3 text-lg hover:shadow-depth transition-wave">
                  Start Reporting
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Official Card */}
          <Card className="glass-ocean border-white/20 hover:shadow-wave transition-wave group cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-wave rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-wave">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gradient-sunset">Official Dashboard</CardTitle>
              <CardDescription className="text-gradient-sunset/80 text-lg">
                Monitor and manage hazard reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gradient-sunset/90">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-glow" />
                  <span>Interactive hazard mapping</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-glow" />
                  <span>Report verification workflow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-glow" />
                  <span>Analytics & trends</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary-glow" />
                  <span>Social media monitoring</span>
                </li>
              </ul>
              <Link to="/dashboard" className="block">
                <Button className="w-full bg-gradient-wave border-0 text-white font-semibold py-3 text-lg hover:shadow-depth transition-wave">
                  Access Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-white/70 pt-8">
          <p className="text-sm">
            Made with 🤍 by DevMatrix
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;