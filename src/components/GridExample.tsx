import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef } from 'react';
import { Activity, Terminal, Layers, Clock } from 'lucide-react';

export const GridExample = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStack | null>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const options = {
      float: true,
      column: 12,
      cellHeight: 80,
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
        w: 4,
        h: 2,
        content: widgetHtml
      });
    });

    return () => {
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy();
        gridInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={gridRef} className="grid-stack bg-gray-100 p-4 rounded-lg min-h-[600px]">
      <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
        <div className="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-gray-800">Build Stats</span>
          </div>
        </div>
      </div>
      <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2">
        <div className="grid-stack-item-content bg-white p-4 rounded-lg shadow-md cursor-move">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-cyan-600" />
            <span className="font-medium text-gray-800">Build Alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
};