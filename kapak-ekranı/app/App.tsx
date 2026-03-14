import { MainScreen } from './components/MainScreen';

export default function App() {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: '#0D0705',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0D0705;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #C8622A;
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #F5C842;
        }
      `}</style>

      <MainScreen />
    </div>
  );
}
