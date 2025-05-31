import { useState } from 'react';
import { Code, Home, FolderOpen, Settings, Menu, ChevronLeft } from 'lucide-react';

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
    id: 'settings',
    label: 'Config',
    icon: Settings,
    description: 'Build settings'
  }
];

export const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-100 shadow-2xl border-r border-gray-300 transition-all duration-300 z-10 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-300 flex items-center justify-between">
        {!collapsed && (
          <div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
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
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'text-white' : 'text-gray-600 group-hover:text-cyan-600'}`} />
              {!collapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              D
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Developer</div>
              <div className="text-xs text-gray-600">builder@dev.local</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}