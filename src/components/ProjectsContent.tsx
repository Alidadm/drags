
import { FolderOpen, Plus, Calendar, Users } from 'lucide-react';

export const ProjectsContent = () => {
  const projects = [
    {
      name: 'E-commerce Platform',
      status: 'In Progress',
      progress: 75,
      team: 5,
      deadline: '2024-02-15',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Mobile App Redesign',
      status: 'Review',
      progress: 90,
      team: 3,
      deadline: '2024-01-30',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'API Documentation',
      status: 'Planning',
      progress: 25,
      team: 2,
      deadline: '2024-03-10',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Security Audit',
      status: 'Completed',
      progress: 100,
      team: 4,
      deadline: '2024-01-20',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
          <p className="text-slate-600">Manage and track your project progress.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-shadow">
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-600 mb-2">Total Projects</h3>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-600 mb-2">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">6</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-600 mb-2">Completed</h3>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-600 mb-2">On Hold</h3>
          <p className="text-2xl font-bold text-orange-600">2</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'Review' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${project.color}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{project.team} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{project.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
