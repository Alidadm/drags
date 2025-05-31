import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { RightSidebar } from '../components/RightSidebar';
import { TopNavbar } from '../components/TopNavbar';
import { DashboardContent } from '../components/DashboardContent';
import { AnalyticsContent } from '../components/AnalyticsContent';
import { ProjectsContent } from '../components/ProjectsContent';
import { SettingsContent } from '../components/SettingsContent';
import { GridExample } from '../components/GridExample';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <GridExample />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <GridExample />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar />
      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="flex">
            <div className="flex-1 p-8">
              {renderContent()}
            </div>
            <RightSidebar />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;