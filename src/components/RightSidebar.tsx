
import { Terminal, Layers, Users, Activity, TrendingUp, Clock } from 'lucide-react';

export const RightSidebar = () => {
  const notifications = [
    { id: 1, message: "Build #1234 completed successfully", time: "2 min ago", type: "success" },
    { id: 2, message: "New dependency update available", time: "15 min ago", type: "update" },
    { id: 3, message: "Performance optimization suggested", time: "1 hour ago", type: "info" }
  ];

  const recentActivity = [
    { action: "Frontend build deployed", user: "CI/CD Pipeline", time: "10 min ago" },
    { action: "API layer updated", user: "Dev Team", time: "25 min ago" },
    { action: "Database migration completed", user: "DevOps", time: "45 min ago" }
  ];

  const stats = [
    { label: "Build Time", value: "2.3m", change: "-15%", icon: Clock, color: "text-blue-600" },
    { label: "Success Rate", value: "98.5%", change: "+2%", icon: TrendingUp, color: "text-green-600" },
    { label: "Active Devs", value: "8", change: "+1", icon: Users, color: "text-purple-600" }
  ];

  return (
    <div className="w-80 bg-gray-100 border-l border-gray-300 p-6 space-y-6 overflow-y-auto">
      {/* Build Stats Widget */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-cyan-600" />
          Build Stats
        </h3>
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-sm text-gray-700">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{stat.value}</div>
                  <div className={`text-xs ${stat.change.startsWith('+') || stat.change.startsWith('-') && !stat.change.startsWith('--') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Build Notifications Widget */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Terminal size={20} className="text-cyan-600" />
          Build Alerts
        </h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'update' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-600">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View all alerts
        </button>
      </div>

      {/* Active Tasks Widget */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Layers size={20} className="text-cyan-600" />
          Active Tasks
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
            <Clock size={16} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Frontend Build</p>
              <p className="text-xs text-gray-600">In progress - 2m 30s</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Clock size={16} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">API Tests</p>
              <p className="text-xs text-gray-600">Queued</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Clock size={16} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Deploy Staging</p>
              <p className="text-xs text-gray-600">Scheduled - 15:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Widget */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity size={20} className="text-cyan-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-600">by {activity.user} • {activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
