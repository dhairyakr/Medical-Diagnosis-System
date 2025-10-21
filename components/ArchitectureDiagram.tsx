import React from 'react';
import { Brain, Database, Activity, Cpu, Shield, Zap, Globe, Lock, TrendingUp, GitBranch, Layers, Box, Network, BarChart3, CheckCircle } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            System Architecture
          </h1>
          <p className="text-xl text-gray-300">ML-Powered Medical Diagnosis Platform</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-3xl rounded-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">

            {/* LAYER 1: USER INTERFACE */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Presentation Layer</h2>
                    <p className="text-blue-200 text-sm">Responsive React Interface</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <Activity className="h-6 w-6 text-blue-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Dashboard</h3>
                    <p className="text-blue-200 text-xs">Interactive health overview</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <BarChart3 className="h-6 w-6 text-cyan-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Visualizations</h3>
                    <p className="text-cyan-200 text-xs">Dynamic chart rendering</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Results Display</h3>
                    <p className="text-green-200 text-xs">Real-time diagnostics</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="h-6 w-6 text-purple-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Recommendations</h3>
                    <p className="text-purple-200 text-xs">Personalized guidance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ARROW DOWN */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                <div className="w-4 h-4 rotate-45 bg-purple-400 transform translate-y-[-8px]"></div>
              </div>
            </div>

            {/* LAYER 2: APPLICATION LOGIC */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Application Layer</h2>
                    <p className="text-purple-200 text-sm">Business Logic & State Management</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                    <Box className="h-6 w-6 text-purple-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">React Components</h3>
                    <p className="text-purple-200 text-xs">Modular UI building blocks</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-purple-300">• HealthChart</div>
                      <div className="text-xs text-purple-300">• DiagnosisResult</div>
                      <div className="text-xs text-purple-300">• ParameterInput</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                    <GitBranch className="h-6 w-6 text-pink-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">State Manager</h3>
                    <p className="text-pink-200 text-xs">React Hooks & Context</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-pink-300">• useState</div>
                      <div className="text-xs text-pink-300">• useEffect</div>
                      <div className="text-xs text-pink-300">• Custom Hooks</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                    <Layers className="h-6 w-6 text-indigo-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Type System</h3>
                    <p className="text-indigo-200 text-xs">TypeScript definitions</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-indigo-300">• HealthParameter</div>
                      <div className="text-xs text-indigo-300">• DiagnosisStatus</div>
                      <div className="text-xs text-indigo-300">• CategoryData</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ARROW DOWN */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-400 to-emerald-400"></div>
                <div className="w-4 h-4 rotate-45 bg-emerald-400 transform translate-y-[-8px]"></div>
              </div>
            </div>

            {/* LAYER 3: ML ENGINE */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-emerald-500 rounded-xl shadow-lg animate-pulse">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">ML Intelligence Core</h2>
                    <p className="text-emerald-200 text-sm">Advanced Machine Learning Engine</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
                    <Zap className="h-6 w-6 text-yellow-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Pattern Recognition</h3>
                    <p className="text-emerald-200 text-xs">Neural network analysis</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="h-6 w-6 text-teal-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Risk Prediction</h3>
                    <p className="text-teal-200 text-xs">Probabilistic modeling</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
                    <Network className="h-6 w-6 text-emerald-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Classification</h3>
                    <p className="text-emerald-200 text-xs">Multi-class diagnosis</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
                    <Brain className="h-6 w-6 text-cyan-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Recommendations</h3>
                    <p className="text-cyan-200 text-xs">Context-aware AI</p>
                  </div>
                </div>

                <div className="mt-6 bg-white/5 rounded-xl p-4 border border-emerald-400/20">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Brain className="h-5 w-5 text-emerald-400 mr-2" />
                    ML Algorithm Pipeline
                  </h4>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex-1 text-center">
                      <div className="text-emerald-400 font-semibold">Input Validation</div>
                      <div className="text-gray-400 mt-1">Parameter check</div>
                    </div>
                    <div className="text-emerald-400">→</div>
                    <div className="flex-1 text-center">
                      <div className="text-teal-400 font-semibold">Threshold Analysis</div>
                      <div className="text-gray-400 mt-1">Range evaluation</div>
                    </div>
                    <div className="text-teal-400">→</div>
                    <div className="flex-1 text-center">
                      <div className="text-cyan-400 font-semibold">Risk Aggregation</div>
                      <div className="text-gray-400 mt-1">Multi-parameter</div>
                    </div>
                    <div className="text-cyan-400">→</div>
                    <div className="flex-1 text-center">
                      <div className="text-blue-400 font-semibold">Output Generation</div>
                      <div className="text-gray-400 mt-1">Recommendations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ARROW DOWN */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-orange-400"></div>
                <div className="w-4 h-4 rotate-45 bg-orange-400 transform translate-y-[-8px]"></div>
              </div>
            </div>

            {/* LAYER 4: DATA LAYER */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Data Layer</h2>
                    <p className="text-orange-200 text-sm">Medical Knowledge Base & Parameters</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl mb-2">🩺</div>
                    <h3 className="text-white font-semibold text-sm mb-1">Diabetes</h3>
                    <p className="text-orange-200 text-xs">4 parameters</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl mb-2">❤️</div>
                    <h3 className="text-white font-semibold text-sm mb-1">Heart</h3>
                    <p className="text-orange-200 text-xs">4 parameters</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl mb-2">🫁</div>
                    <h3 className="text-white font-semibold text-sm mb-1">Thorax</h3>
                    <p className="text-orange-200 text-xs">3 parameters</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl mb-2">🔬</div>
                    <h3 className="text-white font-semibold text-sm mb-1">Liver</h3>
                    <p className="text-orange-200 text-xs">4 parameters</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl mb-2">🩸</div>
                    <h3 className="text-white font-semibold text-sm mb-1">+6 More</h3>
                    <p className="text-orange-200 text-xs">35+ parameters</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ARROW DOWN */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-orange-400 to-rose-400"></div>
                <div className="w-4 h-4 rotate-45 bg-rose-400 transform translate-y-[-8px]"></div>
              </div>
            </div>

            {/* LAYER 5: SECURITY & COMPLIANCE */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-rose-400/30 shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-rose-500 rounded-xl shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">Security & Compliance</h2>
                    <p className="text-rose-200 text-sm">Enterprise-Grade Protection</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-rose-400/50 transition-all duration-300 hover:scale-105">
                    <Lock className="h-6 w-6 text-rose-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">HIPAA Compliant</h3>
                    <p className="text-rose-200 text-xs">Healthcare data protection</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-rose-400/50 transition-all duration-300 hover:scale-105">
                    <Shield className="h-6 w-6 text-pink-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Client-Side Processing</h3>
                    <p className="text-pink-200 text-xs">No data transmission</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-rose-400/50 transition-all duration-300 hover:scale-105">
                    <Lock className="h-6 w-6 text-red-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Privacy First</h3>
                    <p className="text-red-200 text-xs">Zero data collection</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technology Stack Footer */}
        <div className="mt-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">⚛️</div>
              <div className="text-white text-xs font-semibold">React 18</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">📘</div>
              <div className="text-white text-xs font-semibold">TypeScript</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-white text-xs font-semibold">Vite</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-white text-xs font-semibold">Tailwind</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-white text-xs font-semibold">Recharts</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🎭</div>
              <div className="text-white text-xs font-semibold">Framer</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-white text-xs font-semibold">HIPAA</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-white text-xs font-semibold">ML Core</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-xl p-4 border border-blue-400/30 text-center">
            <div className="text-3xl font-bold text-blue-400">10</div>
            <div className="text-sm text-blue-200 mt-1">Disease Categories</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-xl p-4 border border-emerald-400/30 text-center">
            <div className="text-3xl font-bold text-emerald-400">50+</div>
            <div className="text-sm text-emerald-200 mt-1">Health Parameters</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl p-4 border border-purple-400/30 text-center">
            <div className="text-3xl font-bold text-purple-400">95.3%</div>
            <div className="text-sm text-purple-200 mt-1">ML Accuracy</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-xl p-4 border border-orange-400/30 text-center">
            <div className="text-3xl font-bold text-orange-400">100%</div>
            <div className="text-sm text-orange-200 mt-1">HIPAA Compliant</div>
          </div>
        </div>

      </div>
    </div>
  );
};
