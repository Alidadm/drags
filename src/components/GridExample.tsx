import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useLayoutEffect, useRef, useState } from 'react';
import { Activity, Terminal } from 'lucide-react';

export const GridExample = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStack | null>(null);
  const [droppedWidgets, setDroppedWidgets] = useState<Array<{
    x: number;
    y: number;
    content: string;
  }>>([]);

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const grid = GridStack.init({
      float: true,
      cellHeight: '70px',
      minRow: 1,
      acceptWidgets: true,
      dragIn: '.sidebar-item',
      dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }
    }, gridRef.current);

    gridInstanceRef.current = grid;

    // Add drop functionality using React state
    grid.on('dropped', function(event, previousWidget, newWidget) {
      setDroppedWidgets(prev => [
        ...prev,
        {
          x: newWidget.x || 0,
          y: newWidget.y || 0,
          content: newWidget.el.innerHTML
        }
      ]);
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
      {droppedWidgets.map((widget, index) => (
        <div
          key={index}
          className="grid-stack-item"
          data-gs-x={widget.x}
          data-gs-y={widget.y}
          data-gs-width="4"
          data-gs-height="2"
        >
          <div className="grid-stack-item-content bg-white p-4 rounded-lg shadow-md"
               dangerouslySetInnerHTML={{ __html: widget.content }}
          />
        </div>
      ))}
    </div>
  );
};