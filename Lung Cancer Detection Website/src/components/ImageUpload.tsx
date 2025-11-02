import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Upload, LogOut, Activity, AlertCircle, CheckCircle2, Heart, Cigarette, Apple, Dumbbell, Wind, Stethoscope } from 'lucide-react';

interface ImageUploadProps {
  onLogout: () => void;
}

interface AnalysisResult {
  accuracy: number;
  prediction: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function ImageUpload({ onLogout }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Mock analysis result after 2 seconds
    setTimeout(() => {
      const mockAccuracy = Math.random() * 15 + 85; // 85-100% accuracy
      const mockConfidence = Math.random() * 20 + 75; // 75-95% confidence
      const isPositive = Math.random() > 0.6;
      
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (isPositive) {
        riskLevel = mockConfidence > 85 ? 'high' : 'medium';
      }

      setAnalysisResult({
        accuracy: mockAccuracy,
        prediction: isPositive ? 'Potential abnormality detected' : 'No significant abnormalities detected',
        confidence: mockConfidence,
        riskLevel: riskLevel
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setProgress(0);
  };

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
    }
  };

  const getRiskBgColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-red-50 border-red-200';
    }
  };

  const getRiskBadgeColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'bg-green-500 hover:bg-green-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'high': return 'bg-red-500 hover:bg-red-600';
    }
  };

  const getPrecautions = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return [
          { icon: Heart, text: 'Maintain a healthy lifestyle with regular exercise' },
          { icon: Apple, text: 'Eat a balanced diet rich in fruits and vegetables' },
          { icon: Cigarette, text: 'Avoid smoking and secondhand smoke exposure' },
          { icon: Stethoscope, text: 'Schedule annual health checkups' },
          { icon: Wind, text: 'Practice breathing exercises for lung health' }
        ];
      case 'medium':
        return [
          { icon: Stethoscope, text: 'Consult with a healthcare professional immediately' },
          { icon: Cigarette, text: 'Quit smoking if you are a smoker - seek cessation programs' },
          { icon: Wind, text: 'Avoid exposure to air pollution and harmful chemicals' },
          { icon: Dumbbell, text: 'Engage in moderate physical activity daily' },
          { icon: Apple, text: 'Increase intake of antioxidant-rich foods' },
          { icon: Heart, text: 'Monitor symptoms and schedule follow-up tests' }
        ];
      case 'high':
        return [
          { icon: Stethoscope, text: 'URGENT: Schedule an appointment with an oncologist immediately' },
          { icon: AlertCircle, text: 'Get a comprehensive medical evaluation and biopsy' },
          { icon: Cigarette, text: 'Stop smoking immediately and avoid all tobacco products' },
          { icon: Heart, text: 'Inform family members about potential genetic risk factors' },
          { icon: Wind, text: 'Avoid all environmental pollutants and carcinogens' },
          { icon: Apple, text: 'Follow a cancer-prevention diet as recommended by your doctor' },
          { icon: Activity, text: 'Stay physically active as advised by your healthcare team' }
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '0.75s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
          <div>
            <h1 className="text-4xl mb-1 bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">Lung Cancer Detection</h1>
            <p className="text-white drop-shadow">Upload X-ray images for AI-powered analysis</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="bg-white/30 backdrop-blur-md border-white/50 text-white hover:bg-white/50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-white/50">
            <CardHeader className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload X-Ray Image
              </CardTitle>
              <CardDescription className="text-blue-100">Select a chest X-ray image for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors bg-gradient-to-br from-purple-50 to-pink-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img
                        src={selectedImage}
                        alt="Uploaded X-ray"
                        className="max-h-64 mx-auto rounded-lg shadow-lg border-4 border-white"
                      />
                      <p className="text-sm text-purple-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                        <Upload className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-700">Click to upload X-ray image</p>
                        <p className="text-sm text-purple-500 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {selectedImage && !analysisResult && (
                <Button 
                  onClick={analyzeImage} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-lg"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                </Button>
              )}

              {analysisResult && (
                <Button 
                  onClick={resetAnalysis} 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg text-white"
                >
                  Analyze New Image
                </Button>
              )}

              {isAnalyzing && (
                <div className="space-y-2 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">Analyzing image...</p>
                  <Progress value={progress} className="bg-white" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-white/50">
            <CardHeader className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Analysis Results
              </CardTitle>
              <CardDescription className="text-orange-100">AI-generated diagnosis and confidence metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!analysisResult ? (
                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <Activity className="h-10 w-10 text-white animate-pulse" />
                  </div>
                  <p className="text-purple-600">Upload and analyze an image to see results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Prediction */}
                  <Alert className={`${getRiskBgColor(analysisResult.riskLevel)} border-2 shadow-lg`}>
                    {analysisResult.riskLevel === 'low' ? (
                      <CheckCircle2 className={`h-5 w-5 ${getRiskColor(analysisResult.riskLevel)}`} />
                    ) : (
                      <AlertCircle className={`h-5 w-5 ${getRiskColor(analysisResult.riskLevel)}`} />
                    )}
                    <AlertDescription className={getRiskColor(analysisResult.riskLevel)}>
                      {analysisResult.prediction}
                    </AlertDescription>
                  </Alert>

                  {/* Risk Level - Highlighted */}
                  <div className={`p-8 rounded-xl border-4 ${getRiskBgColor(analysisResult.riskLevel)} text-center space-y-4 shadow-2xl bg-gradient-to-br ${
                    analysisResult.riskLevel === 'low' ? 'from-green-100 to-emerald-200' :
                    analysisResult.riskLevel === 'medium' ? 'from-yellow-100 to-amber-200' :
                    'from-red-100 to-rose-200'
                  }`}>
                    <p className="text-sm uppercase tracking-wider">Risk Level Assessment</p>
                    <Badge className={`${getRiskBadgeColor(analysisResult.riskLevel)} text-white px-8 py-3 text-xl shadow-xl animate-pulse`}>
                      ⚠ {analysisResult.riskLevel.toUpperCase()} ⚠
                    </Badge>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200 shadow-lg">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-indigo-700">Model Accuracy</span>
                        <span className="text-sm text-indigo-900">{analysisResult.accuracy.toFixed(2)}%</span>
                      </div>
                      <Progress value={analysisResult.accuracy} className="h-3 bg-indigo-200" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-purple-700">Prediction Confidence</span>
                        <span className="text-sm text-purple-900">{analysisResult.confidence.toFixed(2)}%</span>
                      </div>
                      <Progress value={analysisResult.confidence} className="h-3 bg-purple-200" />
                    </div>
                  </div>

                  {/* Precautions */}
                  <Card className={`border-4 shadow-2xl ${
                    analysisResult.riskLevel === 'low' ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300' :
                    analysisResult.riskLevel === 'medium' ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-300' :
                    'bg-gradient-to-br from-red-50 to-rose-100 border-red-300'
                  }`}>
                    <CardHeader className={`${
                      analysisResult.riskLevel === 'low' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                      analysisResult.riskLevel === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                      'bg-gradient-to-r from-red-400 to-rose-500'
                    } text-white rounded-t-lg`}>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Recommended Precautions
                      </CardTitle>
                      <CardDescription className="text-white/90">Follow these guidelines to reduce risk</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {getPrecautions(analysisResult.riskLevel).map((precaution, index) => (
                          <li key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                            analysisResult.riskLevel === 'low' ? 'bg-white/50' :
                            analysisResult.riskLevel === 'medium' ? 'bg-white/50' :
                            'bg-white/60'
                          }`}>
                            <div className={`rounded-full p-2 ${
                              analysisResult.riskLevel === 'low' ? 'bg-green-200' :
                              analysisResult.riskLevel === 'medium' ? 'bg-yellow-200' :
                              'bg-red-200'
                            }`}>
                              <precaution.icon className={`h-4 w-4 ${getRiskColor(analysisResult.riskLevel)}`} />
                            </div>
                            <span className="text-sm text-gray-800">{precaution.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
