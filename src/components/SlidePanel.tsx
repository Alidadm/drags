
import { useState, useEffect } from 'react';
import { Settings, Palette, Download, Monitor, Smartphone, Tablet } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { openPreview } from '@/utils/preview';

export const SlidePanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState('pc');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const topThreshold = 10;
      setMousePosition(e.clientY);
      setIsVisible(e.clientY <= topThreshold || (isVisible && e.clientY <= 60));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  const handleDeviceChange = (value: string) => {
    if (value) {
      setSelectedDevice(value);
      openPreview(value);
    }
  };

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
          
          {/* Device Preview Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Preview:</span>
              <ToggleGroup type="single" value={selectedDevice} onValueChange={handleDeviceChange} className="border rounded-md">
                <ToggleGroupItem value="pc" aria-label="PC Preview" className="px-3 py-2">
                  <Monitor className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">PC</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="tablet" aria-label="Tablet Preview" className="px-3 py-2">
                  <Tablet className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Tablet</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="mobile" aria-label="Mobile Preview" className="px-3 py-2">
                  <Smartphone className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Mobile</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
