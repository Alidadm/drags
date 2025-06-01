import { useState, useEffect } from 'react';
import { Settings, Palette, Download } from 'lucide-react';

export const SlidePanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const topThreshold = 10;
      setMousePosition(e.clientY);
      setIsVisible(e.clientY <= topThreshold || (isVisible && e.clientY <= 60));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b shadow-lg transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100">
              <Palette className="w-4 h-4" />
              Theme
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};