
import { Package, GitMerge, TrendingUp } from 'lucide-react';

const MobileDashboard = () => {
  return (
    <div className="bg-gray-900 text-white p-4 h-80">
      {/* Mobile Dashboard Content */}
      <div className="space-y-3">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-xs">Orders</span>
              <Package className="h-3 w-3 text-indigo-400" />
            </div>
            <div className="text-lg font-bold">28</div>
            <div className="flex items-center mt-1 text-green-400 text-xs">
              <TrendingUp className="h-2 w-2 mr-1" />
              <span>Active</span>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-xs">Consolidations</span>
              <GitMerge className="h-3 w-3 text-indigo-400" />
            </div>
            <div className="text-lg font-bold">5</div>
            <div className="flex items-center mt-1 text-green-400 text-xs">
              <TrendingUp className="h-2 w-2 mr-1" />
              <span>In Progress</span>
            </div>
          </div>
        </div>
        
        {/* Consolidation Flow Visualization */}
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 relative overflow-hidden h-48">
          <div className="text-xs font-medium mb-2">Consolidation Flow</div>
          <svg className="w-full h-full" viewBox="0 0 200 180">
            {/* Simple flow visualization */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Connection lines */}
            <line x1="30" y1="90" x2="100" y2="40" stroke="url(#gradient)" strokeWidth="2" />
            <line x1="30" y1="90" x2="100" y2="90" stroke="url(#gradient)" strokeWidth="2" />
            <line x1="30" y1="90" x2="100" y2="140" stroke="url(#gradient)" strokeWidth="2" />
            <line x1="100" y1="40" x2="170" y2="90" stroke="url(#gradient)" strokeWidth="2" />
            <line x1="100" y1="90" x2="170" y2="90" stroke="url(#gradient)" strokeWidth="2" />
            <line x1="100" y1="140" x2="170" y2="90" stroke="url(#gradient)" strokeWidth="2" />
            
            {/* Nodes */}
            <circle cx="30" cy="90" r="12" fill="#4F46E5" />
            <circle cx="30" cy="90" r="4" fill="#818CF8" />
            <text x="30" y="114" fill="white" fontSize="10" textAnchor="middle">You</text>
            
            <circle cx="100" cy="40" r="10" fill="#4F46E5" />
            <circle cx="100" cy="40" r="3" fill="#818CF8" />
            <text x="100" y="25" fill="white" fontSize="8" textAnchor="middle">Supplier A</text>
            
            <circle cx="100" cy="90" r="10" fill="#4F46E5" />
            <circle cx="100" cy="90" r="3" fill="#818CF8" />
            <text x="100" y="75" fill="white" fontSize="8" textAnchor="middle">Supplier B</text>
            
            <circle cx="100" cy="140" r="10" fill="#4F46E5" />
            <circle cx="100" cy="140" r="3" fill="#818CF8" />
            <text x="100" y="160" fill="white" fontSize="8" textAnchor="middle">Supplier C</text>
            
            <circle cx="170" cy="90" r="12" fill="#4F46E5" />
            <circle cx="170" cy="90" r="4" fill="#818CF8" />
            <text x="170" y="114" fill="white" fontSize="10" textAnchor="middle">Shipping</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
