
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
      removable: true,
      resizable: {
        handles: 'all'
      }
    };

    const grid = GridStack.init(options, gridRef.current);
    gridInstanceRef.current = grid;

    // Load saved widgets from localStorage
    const savedWidgets = localStorage.getItem('gridstack-widgets');
    if (savedWidgets) {
      const widgets = JSON.parse(savedWidgets);
      grid.load(widgets);
    }

    // Save widgets on change
    grid.on('change', () => {
      const widgets = grid.save();
      localStorage.setItem('gridstack-widgets', JSON.stringify(widgets));
    });

    // Save widgets before unload
    const saveBeforeUnload = () => {
      const widgets = grid.save();
      localStorage.setItem('gridstack-widgets', JSON.stringify(widgets));
    };
    window.addEventListener('beforeunload', saveBeforeUnload);

    const onDragStart = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      event.dataTransfer.setData('text/plain', '');
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event: DragEvent) => {
      const gridElement = event.target as HTMLElement;
      if (!gridElement || !event.dataTransfer) return;

      const widgetElement = document.querySelector('.sidebar-item.dragging');
      if (!widgetElement) return;

      const rect = gridElement.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / (rect.width / 12));
      const y = Math.floor((event.clientY - rect.top) / 150);

      const title = widgetElement.querySelector('.widget-title')?.textContent || 'Widget';
      const iconElement = widgetElement.querySelector('.widget-icon');
      const icon = iconElement?.innerHTML || '';

      grid.addWidget({
        x,
        y,
        w: 3,
        h: 2,
        content: `
          <div class="grid-stack-item-content bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all h-full flex flex-col relative">
            <button class="delete-widget absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
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

      widgetElement.classList.remove('dragging');
      event.preventDefault();

      // Add click event listener to the delete button
      const widgets = gridRef.current?.querySelectorAll('.grid-stack-item');
      widgets?.forEach(widget => {
        const deleteBtn = widget.querySelector('.delete-widget');
        if (deleteBtn && !deleteBtn.hasAttribute('data-listener')) {
          deleteBtn.setAttribute('data-listener', 'true');
          deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            grid.removeWidget(widget as HTMLElement);
          });
        }
      });
    };

    const gridElement = gridRef.current;
    gridElement.addEventListener('dragover', (e) => e.preventDefault());
    gridElement.addEventListener('drop', onDrop);

    return () => {
      cleanupInProgressRef.current = true;
      if (gridInstanceRef.current) {
        saveBeforeUnload(); // Save before destroying
        gridInstanceRef.current.destroy();
        gridInstanceRef.current = null;
      }
      window.removeEventListener('beforeunload', saveBeforeUnload);
      if (gridElement) {
        gridElement.removeEventListener('dragover', (e) => e.preventDefault());
        gridElement.removeEventListener('drop', onDrop);
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
