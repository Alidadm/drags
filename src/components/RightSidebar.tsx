
import { Calendar, Bell, Users, Activity, TrendingUp, Clock } from 'lucide-react';

export const RightSidebar = () => {
  const notifications = [
    { id: 1, message: "New user registered", time: "2 min ago", type: "user" },
    { id: 2, message: "Payment received", time: "15 min ago", type: "payment" },
    { id: 3, message: "System update completed", time: "1 hour ago", type: "system" }
  ];

  const recentActivity = [
    { action: "Project Alpha completed", user: "John Doe", time: "10 min ago" },
    { action: "New layer created", user: "Jane Smith", time: "25 min ago" },
    { action: "Dashboard updated", user: "Mike Johnson", time: "45 min ago" }
  ];

  const stats = [
    { label: "Active Users", value: "1,234", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Revenue", value: "$45K", change: "+8%", icon: TrendingUp, color: "text-green-600" },
    { label: "Tasks", value: "89", change: "-3%", icon: Activity, color: "text-purple-600" }
  ];

  return (
    <div className="w-80 bg-white border-l border-slate-200 p-6 space-y-6 overflow-y-auto">
      {/* Quick Stats Widget */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Activity size={20} />
          Quick Stats
        </h3>
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-sm text-slate-600">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">{stat.value}</div>
                  <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notifications Widget */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notifications
        </h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'user' ? 'bg-blue-500' :
                notification.type === 'payment' ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-slate-900">{notification.message}</p>
                <p className="text-xs text-slate-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all notifications
        </button>
      </div>

      {/* Calendar Widget */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Today's Schedule
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-100">
            <Clock size={16} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-slate-900">Team Meeting</p>
              <p className="text-xs text-slate-500">10:00 AM - 11:00 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Clock size={16} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900">Project Review</p>
              <p className="text-xs text-slate-500">2:00 PM - 3:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Clock size={16} className="text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900">Client Call</p>
              <p className="text-xs text-slate-500">4:30 PM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Widget */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Activity size={20} />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <p className="text-sm font-medium text-slate-900">{activity.action}</p>
              <p className="text-xs text-slate-500">by {activity.user} • {activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
