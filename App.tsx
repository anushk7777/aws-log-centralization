
import React from 'react';
import { S3_BUCKET_POLICY, PROJECT_DETAILS, VIDEO_OUTLINE } from './constants';
import Header from './components/Header';
import ProjectOverview from './components/ProjectOverview';
import PolicyVisualizer from './components/PolicyVisualizer';
import ImplementationGuide from './components/ImplementationGuide';
import ReadmeDisplay from './components/ReadmeDisplay';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProjectOverview details={PROJECT_DETAILS} />
            <PolicyVisualizer policy={S3_BUCKET_POLICY} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <ImplementationGuide steps={VIDEO_OUTLINE} />
            <ReadmeDisplay />
          </div>
        </div>
      </main>
      <footer className="text-center py-8 text-slate-500">
        <p>Built to clarify AWS cross-account logging policies.</p>
      </footer>
    </div>
  );
};

export default App;
