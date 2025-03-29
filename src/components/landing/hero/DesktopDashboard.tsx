
import { Package, GitMerge, Network, Truck, TrendingUp, Activity } from 'lucide-react';

const DesktopDashboard = () => {
  return (
    <div className="bg-gray-900 text-white p-4 h-96">
      <div className="grid grid-cols-12 gap-3">
        {/* Simplified sidebar */}
        <div className="col-span-3 bg-gray-800 p-3 rounded-lg border border-gray-700 h-full">
          <div className="flex items-center mb-4">
            <div className="mr-2 h-7 w-7 rounded bg-indigo-600 flex items-center justify-center text-white">
              G
            </div>
            <div>
              <div className="text-sm font-bold">GROOP</div>
              <div className="text-xs text-indigo-300">PLATFORM</div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="h-8 w-full bg-indigo-600 rounded flex items-center px-2 text-sm">
              <Activity className="h-3.5 w-3.5 mr-1.5" /> Overview
            </div>
            <div className="h-8 w-full hover:bg-gray-700 rounded flex items-center px-2 text-sm">
              <Package className="h-3.5 w-3.5 mr-1.5" /> Orders
            </div>
            <div className="h-8 w-full hover:bg-gray-700 rounded flex items-center px-2 text-sm">
              <GitMerge className="h-3.5 w-3.5 mr-1.5" /> Consolidations
            </div>
            <div className="h-8 w-full hover:bg-gray-700 rounded flex items-center px-2 text-sm">
              <Network className="h-3.5 w-3.5 mr-1.5" /> Suppliers
            </div>
          </div>
        </div>
        
        {/* Main content area - simplified */}
        <div className="col-span-9 space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Orders</span>
                <Package className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center mt-1 text-green-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> +5 since last week
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Consolidations</span>
                <GitMerge className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center mt-1 text-green-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 2 ready to ship
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Utilization</span>
                <Truck className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold">92%</div>
              <div className="flex items-center mt-1 text-green-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> +8% efficiency
              </div>
            </div>
          </div>
          
          {/* Simplified consolidation visualization */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-3 relative h-48">
            <div className="text-sm font-medium mb-2">Consolidation Workflow</div>
            <svg className="w-full h-40" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
              
              {/* Flow lines */}
              <path d="M50,75 L150,25" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M50,75 L150,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M50,75 L150,125" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M150,25 L250,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M150,75 L250,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M150,125 L250,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M250,75 L350,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M350,75 L450,75" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              
              {/* Pulse animations */}
              <circle r="3" fill="#60A5FA">
                <animateMotion path="M50,75 L150,25" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#60A5FA">
                <animateMotion path="M150,75 L250,75" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#60A5FA">
                <animateMotion path="M250,75 L350,75" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#60A5FA">
                <animateMotion path="M350,75 L450,75" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Nodes */}
              <circle cx="50" cy="75" r="15" fill="#4F46E5" />
              <circle cx="50" cy="75" r="7" fill="#818CF8" />
              <text x="50" y="105" fill="white" fontSize="12" textAnchor="middle">You</text>
              
              <circle cx="150" cy="25" r="10" fill="#4F46E5" />
              <circle cx="150" cy="25" r="5" fill="#818CF8" />
              <text x="150" y="15" fill="white" fontSize="10" textAnchor="middle">Supplier A</text>
              
              <circle cx="150" cy="75" r="10" fill="#4F46E5" />
              <circle cx="150" cy="75" r="5" fill="#818CF8" />
              <text x="150" y="65" fill="white" fontSize="10" textAnchor="middle">Supplier B</text>
              
              <circle cx="150" cy="125" r="10" fill="#4F46E5" />
              <circle cx="150" cy="125" r="5" fill="#818CF8" />
              <text x="150" y="145" fill="white" fontSize="10" textAnchor="middle">Supplier C</text>
              
              <circle cx="250" cy="75" r="15" fill="#4F46E5" />
              <circle cx="250" cy="75" r="7" fill="#818CF8" />
              <text x="250" y="105" fill="white" fontSize="12" textAnchor="middle">Consolidation</text>
              
              <circle cx="350" cy="75" r="15" fill="#4F46E5" />
              <circle cx="350" cy="75" r="7" fill="#818CF8" />
              <text x="350" y="105" fill="white" fontSize="12" textAnchor="middle">Documentation</text>
              
              <circle cx="450" cy="75" r="15" fill="#4F46E5" />
              <circle cx="450" cy="75" r="7" fill="#818CF8" />
              <text x="450" y="105" fill="white" fontSize="12" textAnchor="middle">Shipping</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
