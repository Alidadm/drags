import { Code, GitBranch, Zap, Cpu } from 'lucide-react';

export const DashboardContent = () => {
  const stats = [
    {
      title: 'Active Builds',
      value: '12',
      change: '+3 today',
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Deploy Success',
      value: '98.5%',
      change: '+2.1%',
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Branches',
      value: '47',
      change: '+8 this week',
      icon: GitBranch,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Performance',
      value: '2.1s',
      change: '-0.3s',
      icon: Cpu,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Builder Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Build Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Build completed: frontend-app', time: '2 minutes ago', type: 'success' },
              { action: 'Deploy started: api-service', time: '15 minutes ago', type: 'progress' },
              { action: 'Test suite passed: auth-module', time: '1 hour ago', type: 'success' },
              { action: 'Dependency updated: React 18.3', time: '2 hours ago', type: 'update' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'progress' ? 'bg-blue-500' :
                  activity.type === 'update' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Build', color: 'from-blue-500 to-blue-600' },
              { label: 'Deploy', color: 'from-green-500 to-green-600' },
              { label: 'Run Tests', color: 'from-purple-500 to-purple-600' },
              { label: 'View Logs', color: 'from-orange-500 to-orange-600' }
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium hover:shadow-lg transition-all hover:scale-105`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
