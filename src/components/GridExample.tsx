import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef } from 'react';

export const GridExample = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStack | null>(null);
  const cleanupInProgressRef = useRef(false);

  useLayoutEffect(() => {
    if (!gridRef.current || cleanupInProgressRef.current) return;

    const options = {
      float: true,
      column: 12,
      cellHeight: 150,
      minRow: 2,
      acceptWidgets: true,
      margin: 10,
      draggable: {
        scroll: false,
        appendTo: 'body'
      },
      dragIn: '.sidebar-item',
      dragInOptions: { 
        helper: 'clone',
        appendTo: 'body',
        containment: true,
        revert: 'invalid'
      }
    };

    const grid = GridStack.init(options, gridRef.current);
    gridInstanceRef.current = grid;

    grid.on('dropped', function(event: Event, previousWidget: any, newWidget: any) {
      const el = newWidget.el as HTMLElement;
      const title = el.querySelector('.widget-title')?.textContent || 'Widget';
      const icon = el.querySelector('.widget-icon')?.innerHTML || '';
      
      // Remove the temporary element
      el.remove();
      
      // Add the actual widget with proper styling
      grid.addWidget({
        x: newWidget.x,
        y: newWidget.y,
        w: 3,
        h: 2,
        content: `
          <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <div class="p-1.5 bg-cyan-100 rounded-md">
                ${icon}
              </div>
              <h3 class="font-medium text-gray-800 text-sm">${title}</h3>
            </div>
            <div class="flex-1 flex items-center justify-center text-gray-500 text-xs">
              Widget content goes here
            </div>
          </div>
        `
      });
    });

    return () => {
      cleanupInProgressRef.current = true;
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy();
        gridInstanceRef.current = null;
      }
      cleanupInProgressRef.current = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Builder Hub Dashboard</h1>
        <p className="text-gray-600">Drag widgets from the right sidebar to build your custom dashboard</p>
      </div>
      
      <div 
        ref={gridRef} 
        className="grid-stack bg-gray-50 p-6 rounded-lg min-h-[600px] border-2 border-dashed border-gray-300"
      />
    </div>
  );
};