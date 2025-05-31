
import { BarChart3, TrendingUp, PieChart, Target } from 'lucide-react';

export const AnalyticsContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-600">Detailed insights and performance metrics for your business.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Page Views</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">124,563</p>
            <p className="text-sm text-green-600">↗ +15.3% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Conversion Rate</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">3.24%</p>
            <p className="text-sm text-green-600">↗ +0.8% from last week</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Goals Completed</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">89%</p>
            <p className="text-sm text-green-600">↗ +12% from last quarter</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Traffic Analytics</h3>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Interactive charts would be displayed here</p>
            <p className="text-sm text-slate-500">Connect with your analytics provider</p>
          </div>
        </div>
      </div>
    </div>
  );
};
