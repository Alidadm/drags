
import { useState } from 'react';
import { BarChart3, Home, FolderOpen, Settings, Menu, ChevronLeft, Layers } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Main overview'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Data insights'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    description: 'Project management'
  },
  {
    id: 'new-layer',
    label: 'New Layer',
    icon: Layers,
    description: 'Layer management'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Configuration'
  }
];

export const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-slate-200 transition-all duration-300 z-10 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
              {!collapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.description}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">Admin User</div>
              <div className="text-xs text-slate-500">admin@example.com</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
