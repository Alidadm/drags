import { Terminal, Layers, Users, Activity, TrendingUp, Clock } from 'lucide-react';

export const RightSidebar = () => {
  const widgets = [
    { id: 'build-stats', title: 'Build Stats', icon: Activity },
    { id: 'build-alerts', title: 'Build Alerts', icon: Terminal },
    { id: 'active-tasks', title: 'Active Tasks', icon: Layers },
    { id: 'recent-activity', title: 'Recent Activity', icon: Activity }
  ];

  return (
    <div className="w-80 bg-gray-100 border-l border-gray-300 p-6 space-y-6 overflow-y-auto">
      {/* Draggable Widgets */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Layers size={20} className="text-cyan-600" />
          Available Widgets
        </h3>
        <div className="space-y-3">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                className="sidebar-item cursor-move bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                data-gs-width="4"
                data-gs-height="2"
              >
                <div className="widget-content flex items-center gap-2">
                  <Icon size={16} className="text-cyan-600" />
                  <span className="font-medium text-gray-800">{widget.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Build Stats Widget */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-cyan-600" />
          Build Stats
        </h3>
        <div className="space-y-3">
          {[
            { label: "Build Time", value: "2.3m", change: "-15%", icon: Clock, color: "text-blue-600" },
            { label: "Success Rate", value: "98.5%", change: "+2%", icon: TrendingUp, color: "text-green-600" },
            { label: "Active Devs", value: "8", change: "+1", icon: Users, color: "text-purple-600" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-sm text-gray-700">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{stat.value}</div>
                  <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};