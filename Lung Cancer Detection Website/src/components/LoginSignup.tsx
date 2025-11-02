import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Activity, Sparkles, Shield } from 'lucide-react';

interface LoginSignupProps {
  onLogin: () => void;
}

export function LoginSignup({ onLogin }: LoginSignupProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials
    if (loginEmail && loginPassword) {
      onLogin();
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in real app, create account
    if (signupName && signupEmail && signupPassword) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
          <div className="flex items-center justify-center mb-3">
            <Activity className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Lung Cancer Detection</h1>
          <div className="flex items-center justify-center gap-2 text-white">
            <Sparkles className="h-4 w-4" />
            <p className="drop-shadow">AI-Powered X-Ray Analysis System</p>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/30 backdrop-blur-md border border-white/30">
            <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-white/50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-blue-100">Login to access the detection system</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-purple-700">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-purple-700">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="border-2 border-purple-200 focus:border-purple-500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-white/50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Create Account
                </CardTitle>
                <CardDescription className="text-purple-100">Sign up to start analyzing X-ray images</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-pink-700">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="border-2 border-pink-200 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-pink-700">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="email@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="border-2 border-pink-200 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-pink-700">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="border-2 border-pink-200 focus:border-pink-500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg">
                    Sign Up
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
