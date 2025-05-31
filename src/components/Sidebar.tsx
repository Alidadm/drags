import { useState } from 'react';
import { Code, Home, FolderOpen, Settings, Menu, ChevronLeft, Layers } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Builder Hub',
    icon: Home,
    description: 'Main workspace'
  },
  {
    id: 'analytics',
    label: 'Performance',
    icon: Code,
    description: 'Build metrics'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    description: 'Active builds'
  },
  {
    id: 'new-layer',
    label: 'New Layer',
    icon: Layers,
    description: 'Component builder'
  },
  {
    id: 'settings',
    label: 'Config',
    icon: Settings,
    description: 'Build settings'
  }
];

export const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 shadow-2xl border-r border-slate-700 transition-all duration-300 z-10 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
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
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`} />
              {!collapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              D
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Developer</div>
              <div className="text-xs text-slate-400">builder@dev.local</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
