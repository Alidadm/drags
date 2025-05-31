
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

    // Start with a clean dashboard - no initial widgets

    grid.on('dropped', (_event: Event, _previousWidget: any, newWidget: any) => {
      const widgetContent = newWidget.el.querySelector('.widget-content')?.innerHTML || '';
      const widgetHtml = `
        <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move border border-gray-200 hover:shadow-lg transition-all">
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
          gridInstanceRef.current.removeAll(false);
          
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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Builder Hub Dashboard</h1>
        <p className="text-gray-600">Drag widgets from the right sidebar to build your custom dashboard</p>
      </div>
      
      <div ref={gridRef} className="grid-stack bg-gray-50 p-6 rounded-lg min-h-[600px] border-2 border-dashed border-gray-300" />
    </div>
  );
};
