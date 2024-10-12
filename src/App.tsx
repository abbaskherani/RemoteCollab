import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CodeEditor from './pages/CodeEditor';
import VideoChat from './pages/VideoChat';
import Whiteboard from './pages/WhiteBoard';
import TaskManager from './pages/TaskManager';
import FileRepository from './components/FileRepository';
import ProjectOverview from './components/ProjectOverview';
import TeamChat from './components/TeamChat';
import TimeTracker from './components/TimeTracker';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code-editor" element={<CodeEditor />} />
            <Route path="/video-chat" element={<VideoChat />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/file-sharing" element={<FileRepository />} />
            <Route path="/time-tracking" element={<TimeTracker />} />
            <Route path="/team-chat" element={<TeamChat/>} />
            <Route path="/project-management" element={<ProjectOverview />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;