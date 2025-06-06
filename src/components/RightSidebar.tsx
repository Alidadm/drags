import { Terminal, Layers, Activity, TrendingUp, Clock, BarChart3, Cpu } from 'lucide-react';
import { useState } from 'react';

export const RightSidebar = () => {
  const [widgets, setWidgets] = useState([
    { id: 'build-stats', title: 'Build Stats', icon: Activity, description: 'View build performance metrics' },
    { id: 'build-alerts', title: 'Build Alerts', icon: Terminal, description: 'Monitor build notifications' },
    { id: 'active-tasks', title: 'Active Tasks', icon: Layers, description: 'Track ongoing build tasks' },
    { id: 'recent-activity', title: 'Recent Activity', icon: Clock, description: 'See latest build activities' },
    { id: 'performance', title: 'Performance', icon: BarChart3, description: 'Analyze system performance' },
    { id: 'system-status', title: 'System Status', icon: Cpu, description: 'Monitor system health' }
  ]);

  const handleDragStart = (e: React.DragEvent, widget: any) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', widget.id);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.remove('dragging');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    const container = e.currentTarget as HTMLElement;
    const siblings = [...container.querySelectorAll('.sidebar-item:not(.dragging)')];
    
    const nextSibling = siblings.find(sibling => {
      const rect = sibling.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });

    if (draggedItem) {
      container.insertBefore(draggedItem, nextSibling || null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    const items = [...container.querySelectorAll('.sidebar-item')];
    const newWidgets = items.map(item => {
      const widgetId = item.getAttribute('data-widget-id');
      return widgets.find(w => w.id === widgetId)!;
    });
    setWidgets(newWidgets);
  };

  return (
    <div className="w-80 bg-gray-100 border-l border-gray-300 p-6 space-y-6 overflow-y-auto">
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Layers size={20} className="text-cyan-600" />
          Widget Library
        </h3>
        <p className="text-sm text-gray-600 mb-4">Drag widgets to your dashboard</p>
        
        <div 
          className="space-y-3"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                data-widget-id={widget.id}
                className="sidebar-item cursor-move"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, widget)}
                onDragEnd={handleDragEnd}
              >
                <div className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-cyan-300 group select-none">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-lg group-hover:bg-cyan-200 transition-colors widget-icon">
                      <Icon size={16} className="text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm widget-title">{widget.title}</div>
                      <div className="text-xs text-gray-500">{widget.description}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    Ready to use
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