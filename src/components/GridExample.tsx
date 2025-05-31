
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
      acceptWidgets: '.sidebar-item',
      margin: 10,
      dragIn: '.sidebar-item',
      dragInOptions: { 
        revert: 'invalid', 
        scroll: false, 
        appendTo: 'body', 
        helper: 'clone',
        containment: 'document',
        zIndex: 1000
      },
      removable: false
    };

    const grid = GridStack.init(options, gridRef.current);
    gridInstanceRef.current = grid;

    grid.on('dropped', (event: Event, previousWidget: any, newWidget: any) => {
      console.log('Widget dropped - full event data:', { event, previousWidget, newWidget });
      
      if (newWidget && newWidget.el) {
        const tempEl = newWidget.el;
        
        // Get widget data from the temporary element or data transfer
        let widgetTitle = 'Default Widget';
        let widgetIcon = '<div class="w-4 h-4 bg-cyan-500 rounded"></div>';
        
        // Try to extract data from the cloned element
        const titleEl = tempEl.querySelector('.widget-title');
        const iconEl = tempEl.querySelector('.widget-icon svg');
        
        if (titleEl) {
          widgetTitle = titleEl.textContent || widgetTitle;
          console.log('Found widget title:', widgetTitle);
        }
        
        if (iconEl) {
          widgetIcon = iconEl.outerHTML || widgetIcon;
          console.log('Found widget icon:', widgetIcon);
        }
        
        // Remove the temporary element
        tempEl.remove();
        
        // Create the actual widget content
        const widgetHtml = `
          <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col">
            <div class="flex items-center gap-2 mb-2">
              <div class="p-1.5 bg-cyan-100 rounded-md">
                ${widgetIcon}
              </div>
              <h3 class="font-medium text-gray-800 text-sm">${widgetTitle}</h3>
            </div>
            <div class="flex-1 flex items-center justify-center text-gray-500 text-xs">
              Widget content goes here
            </div>
            <div class="text-xs text-gray-400 mt-2">
              Click to configure
            </div>
          </div>
        `;
        
        // Add the widget to the grid
        const addedWidget = grid.addWidget({
          x: newWidget.x || 0,
          y: newWidget.y || 0,
          w: 3,
          h: 2,
          content: widgetHtml
        });
        
        console.log('Widget added successfully:', addedWidget);
      }
    });

    grid.on('dragstart', (event: Event, el: HTMLElement) => {
      console.log('Grid drag started for:', el);
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
      
      <div 
        ref={gridRef} 
        className="grid-stack bg-gray-50 p-6 rounded-lg min-h-[600px] border-2 border-dashed border-gray-300"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};
