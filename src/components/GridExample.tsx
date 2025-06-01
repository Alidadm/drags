import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef } from 'react';
import { X } from 'lucide-react';

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
      draggable: {
        handle: '.grid-stack-item-content',
        scroll: false,
        appendTo: 'body'
      },
      dragMode: 'clone',
      removable: true
    };

    const grid = GridStack.init(options, gridRef.current);
    gridInstanceRef.current = grid;

    const handleDeleteWidget = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.delete-widget-btn')) {
        const gridItem = target.closest('.grid-stack-item') as HTMLElement;
        if (gridItem && grid) {
          grid.removeWidget(gridItem);
        }
      }
    };

    const onDragStart = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.dataTransfer.setData('text/plain', '');
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      
      if (!grid) return;
      
      const data = event.dataTransfer?.getData('application/json');
      if (!data) return;
      
      try {
        const widgetData = JSON.parse(data);
        
        const rect = gridRef.current!.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / (rect.width / 12));
        const y = Math.floor((event.clientY - rect.top) / 150);

        const widgetElement = grid.addWidget({
          x,
          y,
          w: 3,
          h: 2,
          content: `
            <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col relative">
              <button class="delete-widget-btn absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors z-10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 6-12 12"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
              <div class="flex items-center gap-2 mb-2">
                <div class="p-1.5 bg-cyan-100 rounded-md">
                  ${widgetData.icon}
                </div>
                <h3 class="font-medium text-gray-800 text-sm">${widgetData.title}</h3>
              </div>
              <div class="flex-1 flex items-center justify-center text-gray-500 text-xs">
                Widget content goes here
              </div>
            </div>
          `
        });
        
      } catch (error) {
        console.error('Error parsing widget data:', error);
      }
    };

    const gridElement = gridRef.current;
    gridElement.addEventListener('dragover', (e) => e.preventDefault());
    gridElement.addEventListener('drop', onDrop);
    gridElement.addEventListener('click', handleDeleteWidget);

    return () => {
      cleanupInProgressRef.current = true;
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy();
        gridInstanceRef.current = null;
      }
      if (gridElement) {
        gridElement.removeEventListener('dragover', (e) => e.preventDefault());
        gridElement.removeEventListener('drop', onDrop);
        gridElement.removeEventListener('click', handleDeleteWidget);
      }
      cleanupInProgressRef.current = false;
    };
  }, []);

  return (
    <div className="space-y-6">      
      <div 
        ref={gridRef} 
        className="grid-stack bg-gray-50 p-6 rounded-lg min-h-[600px] border-2 border-dashed border-gray-300"
      />
    </div>
  );
};
