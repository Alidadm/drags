
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardContent } from '../components/DashboardContent';
import { AnalyticsContent } from '../components/AnalyticsContent';
import { ProjectsContent } from '../components/ProjectsContent';
import { NewLayerContent } from '../components/NewLayerContent';
import { SettingsContent } from '../components/SettingsContent';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'new-layer':
        return <NewLayerContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
