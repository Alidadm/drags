
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef } from 'react';
import { Activity, Terminal, Layers, Clock } from 'lucide-react';

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
      acceptWidgets: '.grid-stack-item',
      margin: 10,
      dragIn: '.sidebar-item',
      dragInOptions: { 
        revert: 'invalid', 
        scroll: false, 
        appendTo: 'body', 
        helper: 'clone' 
      }
    };

    const grid = GridStack.init(options, gridRef.current);
    gridInstanceRef.current = grid;

    // Load initial widgets programmatically
    const initialWidgets = [
      {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        content: `
          <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-cyan-600">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span class="font-medium text-gray-800">Build Stats</span>
            </div>
          </div>
        `
      },
      {
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        content: `
          <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-cyan-600">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <span class="font-medium text-gray-800">Build Alerts</span>
            </div>
          </div>
        `
      }
    ];

    grid.load(initialWidgets);

    grid.on('dropped', (_event: Event, _previousWidget: any, newWidget: any) => {
      const widgetContent = newWidget.el.querySelector('.widget-content')?.innerHTML || '';
      const widgetHtml = `
        <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move">
          ${widgetContent}
        </div>
      `;
      
      grid.addWidget({
        x: newWidget.x || 0,
        y: newWidget.y || 0,
        w: 1,
        h: 1,
        content: widgetHtml
      });
    });

    return () => {
      cleanupInProgressRef.current = true;
      
      try {
        if (gridInstanceRef.current && gridRef.current && document.contains(gridRef.current)) {
          // Remove all widgets first to prevent DOM conflicts
          gridInstanceRef.current.removeAll(false);
          
          // Small delay to ensure DOM operations complete
          setTimeout(() => {
            try {
              if (gridInstanceRef.current) {
                gridInstanceRef.current.destroy(false);
              }
            } catch (destroyError) {
              console.warn('GridStack destroy error (safely ignored):', destroyError);
            }
            gridInstanceRef.current = null;
            cleanupInProgressRef.current = false;
          }, 0);
        } else {
          gridInstanceRef.current = null;
          cleanupInProgressRef.current = false;
        }
      } catch (error) {
        console.warn('GridStack cleanup error (safely ignored):', error);
        gridInstanceRef.current = null;
        cleanupInProgressRef.current = false;
      }
    };
  }, []);

  return (
    <div ref={gridRef} className="grid-stack bg-gray-100 p-4 rounded-lg min-h-[600px]" />
  );
};
