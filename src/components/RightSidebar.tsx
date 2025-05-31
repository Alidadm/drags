
import { Terminal, Layers, Users, Activity, TrendingUp, Clock, BarChart3, Cpu } from 'lucide-react';

export const RightSidebar = () => {
  const widgets = [
    { id: 'build-stats', title: 'Build Stats', icon: Activity, description: 'View build performance metrics' },
    { id: 'build-alerts', title: 'Build Alerts', icon: Terminal, description: 'Monitor build notifications' },
    { id: 'active-tasks', title: 'Active Tasks', icon: Layers, description: 'Track ongoing build tasks' },
    { id: 'recent-activity', title: 'Recent Activity', icon: Clock, description: 'See latest build activities' },
    { id: 'performance', title: 'Performance', icon: BarChart3, description: 'Analyze system performance' },
    { id: 'system-status', title: 'System Status', icon: Cpu, description: 'Monitor system health' }
  ];

  return (
    <div className="w-80 bg-gray-100 border-l border-gray-300 p-6 space-y-6 overflow-y-auto">
      {/* Widget Library */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Layers size={20} className="text-cyan-600" />
          Widget Library
        </h3>
        <p className="text-sm text-gray-600 mb-4">Drag widgets to your dashboard</p>
        
        <div className="space-y-3">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                className="sidebar-item grid-stack-item cursor-grab active:cursor-grabbing"
                data-gs-width="1"
                data-gs-height="1"
                draggable="true"
                onDragStart={(e) => {
                  console.log('Starting drag for widget:', widget.title);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
              >
                <div className="widget-content bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-cyan-300 group select-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors">
                      <Icon size={16} className="text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{widget.title}</div>
                      <div className="text-xs text-gray-500">{widget.description}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    Ready to use
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-green-600" />
          Quick Stats
        </h3>
        <div className="space-y-3">
          {[
            { label: "Active Builds", value: "3", color: "text-blue-600" },
            { label: "Queue", value: "0", color: "text-green-600" },
            { label: "Failed", value: "1", color: "text-red-600" }
          ].map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{stat.label}</span>
              <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
