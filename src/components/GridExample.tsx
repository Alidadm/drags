
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef } from 'react';
import { isPreviewMode } from '../utils/preview';

export const GridExample = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStack | null>(null);
  const isInitialized = useRef(false);
  const previewMode = isPreviewMode();

  // Load saved widgets from localStorage
  const loadSavedWidgets = (grid: GridStack) => {
    try {
      const savedWidgets = localStorage.getItem('dashboard-widgets');
      if (savedWidgets) {
        const widgets = JSON.parse(savedWidgets);
        widgets.forEach((widget: any) => {
          const newWidget = grid.addWidget({
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
            content: widget.content
          });
          
          // Add delete button listener for loaded widgets (only in non-preview mode)
          if (!previewMode) {
            const deleteBtn = newWidget?.querySelector('.delete-widget');
            if (deleteBtn) {
              deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (gridInstanceRef.current && newWidget) {
                  gridInstanceRef.current.removeWidget(newWidget as HTMLElement);
                  saveWidgets();
                }
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading saved widgets:', error);
    }
  };

  // Save current widgets to localStorage
  const saveWidgets = () => {
    if (!gridInstanceRef.current || !gridRef.current || previewMode) return;
    
    try {
      const widgets: any[] = [];
      const gridItems = gridRef.current.querySelectorAll('.grid-stack-item');
      
      gridItems?.forEach(item => {
        const node = (item as any).gridstackNode;
        if (node) {
          widgets.push({
            x: node.x,
            y: node.y,
            w: node.w,
            h: node.h,
            content: item.innerHTML
          });
        }
      });
      
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
    } catch (error) {
      console.error('Error saving widgets:', error);
    }
  };

  useLayoutEffect(() => {
    if (!gridRef.current || isInitialized.current) return;

    try {
      const options = {
        float: true,
        column: 12,
        cellHeight: 150,
        minRow: 2,
        acceptWidgets: !previewMode, // Disable widget acceptance in preview mode
        margin: 10,
        draggable: {
          handle: '.grid-stack-item-content',
          scroll: false
        },
        resizable: {
          handles: 'all'
        },
        staticGrid: previewMode // Make grid static in preview mode
      };

      const grid = GridStack.init(options, gridRef.current);
      if (!grid) {
        console.error('Failed to initialize GridStack');
        return;
      }

      gridInstanceRef.current = grid;
      isInitialized.current = true;

      // Load saved widgets
      loadSavedWidgets(grid);

      // Only add event listeners for non-preview mode
      if (!previewMode) {
        // Listen for widget changes to save state
        grid.on('added removed change', () => {
          saveWidgets();
        });

        // Handle drag and drop from sidebar
        const handleDragOver = (event: DragEvent) => {
          event.preventDefault();
          event.dataTransfer!.dropEffect = 'move';
        };

        const handleDrop = (event: DragEvent) => {
          event.preventDefault();
          
          const draggedElement = document.querySelector('.sidebar-item.dragging');
          if (!draggedElement || !gridInstanceRef.current) return;

          const rect = gridRef.current!.getBoundingClientRect();
          const cellWidth = rect.width / 12;
          const cellHeight = 150 + 10; // cellHeight + margin
          
          const x = Math.max(0, Math.min(11, Math.floor((event.clientX - rect.left) / cellWidth)));
          const y = Math.max(0, Math.floor((event.clientY - rect.top) / cellHeight));

          const title = draggedElement.querySelector('.widget-title')?.textContent || 'Widget';
          const iconElement = draggedElement.querySelector('.widget-icon');
          const icon = iconElement?.innerHTML || '';

          const newWidget = gridInstanceRef.current.addWidget({
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

          // Add delete button listener
          const deleteBtn = newWidget?.querySelector('.delete-widget');
          if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (gridInstanceRef.current && newWidget) {
                gridInstanceRef.current.removeWidget(newWidget as HTMLElement);
                saveWidgets();
              }
            });
          }

          draggedElement.classList.remove('dragging');
          saveWidgets();
        };

        const gridElement = gridRef.current;
        gridElement.addEventListener('dragover', handleDragOver);
        gridElement.addEventListener('drop', handleDrop);

        return () => {
          try {
            if (gridElement) {
              gridElement.removeEventListener('dragover', handleDragOver);
              gridElement.removeEventListener('drop', handleDrop);
            }
            if (gridInstanceRef.current && gridRef.current) {
              gridInstanceRef.current.destroy(false);
              gridInstanceRef.current = null;
            }
          } catch (error) {
            console.error('Error during cleanup:', error);
          }
          isInitialized.current = false;
        };
      }

      return () => {
        try {
          if (gridInstanceRef.current && gridRef.current) {
            gridInstanceRef.current.destroy(false);
            gridInstanceRef.current = null;
          }
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
        isInitialized.current = false;
      };
    } catch (error) {
      console.error('Error initializing GridStack:', error);
      isInitialized.current = false;
    }
  }, [previewMode]);

  return (
    <div className="space-y-6">      
      <div 
        ref={gridRef} 
        className={`grid-stack ${previewMode ? 'bg-white' : 'bg-gray-50'} p-6 rounded-lg min-h-[600px] ${!previewMode ? 'border-2 border-dashed border-gray-300' : ''}`}
      />
    </div>
  );
};
