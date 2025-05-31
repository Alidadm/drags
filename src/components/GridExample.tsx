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

    return () => {
      grid.destroy();
    };
  }, []);

  return (
    <div className="grid-stack">
      <div className="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content bg-white p-4 rounded shadow">
          Draggable Item 1
        </div>
      </div>
      <div className="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content bg-white p-4 rounded shadow">
          Draggable Item 2
        </div>
      </div>
    </div>
  );
};