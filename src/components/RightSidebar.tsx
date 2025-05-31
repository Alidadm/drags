
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
    { label: "Build Time", value: "2.3m", change: "-15%", icon: Clock, color: "text-blue-400" },
    { label: "Success Rate", value: "98.5%", change: "+2%", icon: TrendingUp, color: "text-green-400" },
    { label: "Active Devs", value: "8", change: "+1", icon: Users, color: "text-purple-400" }
  ];

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-700 p-6 space-y-6 overflow-y-auto">
      {/* Build Stats Widget */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-cyan-400" />
          Build Stats
        </h3>
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-sm text-slate-300">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{stat.value}</div>
                  <div className={`text-xs ${stat.change.startsWith('+') || stat.change.startsWith('-') && !stat.change.startsWith('--') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Build Notifications Widget */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Terminal size={20} className="text-cyan-400" />
          Build Alerts
        </h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'update' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-white">{notification.message}</p>
                <p className="text-xs text-slate-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-sm text-cyan-400 hover:text-cyan-300 font-medium">
          View all alerts
        </button>
      </div>

      {/* Active Tasks Widget */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layers size={20} className="text-cyan-400" />
          Active Tasks
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Clock size={16} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">Frontend Build</p>
              <p className="text-xs text-slate-400">In progress - 2m 30s</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
            <Clock size={16} className="text-slate-500" />
            <div>
              <p className="text-sm font-medium text-white">API Tests</p>
              <p className="text-xs text-slate-400">Queued</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
            <Clock size={16} className="text-slate-500" />
            <div>
              <p className="text-sm font-medium text-white">Deploy Staging</p>
              <p className="text-xs text-slate-400">Scheduled - 15:30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Widget */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-cyan-400" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <p className="text-sm font-medium text-white">{activity.action}</p>
              <p className="text-xs text-slate-400">by {activity.user} • {activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
