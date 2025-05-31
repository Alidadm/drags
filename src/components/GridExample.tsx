import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useEffect } from 'react';

export const GridExample = () => {
  useEffect(() => {
    const grid = GridStack.init({
      float: true,
      cellHeight: '70px',
      minRow: 1,
      acceptWidgets: true,
      dragIn: '.sidebar-item',
      dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }
    });

    // Add drop functionality
    grid.on('dropped', function(event, previousWidget, newWidget) {
      const gridItem = event.target;
      const content = gridItem.querySelector('.grid-stack-item-content');
      if (content) {
        content.innerHTML = newWidget.el.innerHTML;
        content.className = 'grid-stack-item-content bg-white p-4 rounded-lg shadow-md';
      }
    });

    return () => {
      grid.destroy();
    };
  }, []);

  return (
    <div className="grid-stack bg-gray-100 p-4 rounded-lg min-h-[600px]">
      <div className="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-gray-800">Build Stats</span>
          </div>
        </div>
      </div>
      <div className="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-gray-800">Build Alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
};