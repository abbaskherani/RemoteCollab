import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Code, Video, PenTool, CheckSquare, Bell, Settings, User, LogOut } from 'lucide-react';
import IconButton from '../components/IconButton';
import DashboardCard from '../components/DashboardCard';

interface RecentActivity {
  id: number;
  type: 'code' | 'video' | 'whiteboard' | 'task';
  description: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Simulated recent activities (in a real app, this would come from an API)
    setRecentActivities([
      { id: 1, type: 'code', description: 'Updated login component', timestamp: '2 hours ago' },
      { id: 2, type: 'video', description: 'Meeting with design team', timestamp: '3 hours ago' },
      { id: 3, type: 'whiteboard', description: 'Brainstorming session', timestamp: '1 day ago' },
      { id: 4, type: 'task', description: 'Completed API integration', timestamp: '2 days ago' },
    ]);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'code': return <Code size={16} className="text-blue-600" />;
      case 'video': return <Video size={16} className="text-green-600" />;
      case 'whiteboard': return <PenTool size={16} className="text-yellow-600" />;
      case 'task': return <CheckSquare size={16} className="text-purple-600" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{greeting}, User!</h1>
        <div className="flex space-x-4">
            <IconButton icon ={<Bell />} />
            <IconButton icon ={<Settings />} />
            <IconButton icon ={<User />} />
            <IconButton icon ={<LogOut />} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard
        to="/code-editor"
        icon={<Code  />}
        title="Code Editor"
        description="Collaborate on code in real-time"
        className="text-blue-600"
      />
      <DashboardCard
        to="/video-chat"
        icon={<Video  />}
        title="Video Chat"
        description="Connect face-to-face with your team"
        className="text-green-600"
      />
      <DashboardCard
        to="/whiteboard"
        icon={<PenTool  />}
        title="Whiteboard"
        description="Brainstorm and sketch ideas together"
        className="text-yellow-600"
      />
      <DashboardCard
        to="/tasks"
        icon={<CheckSquare  />}
        title="Task Manager"
        description="Organize and track project tasks"
        className="text-purple-600"
      />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-center">
                <span className="mr-2">{getActivityIcon(activity.type)}</span>
                <span className="flex-grow">{activity.description}</span>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-100 text-blue-700 p-4 rounded-lg hover:bg-blue-200 transition-colors"
             onClick={() => navigate('/code-editor')}>
              New Code Snippet
            </button>
            <button className="bg-green-100 text-green-700 p-4 rounded-lg hover:bg-green-200 transition-colors"
             onClick={() => navigate('/schedule-meeting')}>
              Schedule Meeting
            </button>
            <button className="bg-yellow-100 text-yellow-700 p-4 rounded-lg hover:bg-yellow-200 transition-colors"
             onClick={() => navigate('/whiteboard')}>
              Create Whiteboard
            </button>
            <button className="bg-purple-100 text-purple-700 p-4 rounded-lg hover:bg-purple-200 transition-colors"
             onClick={() => navigate('/tasks')}>
            
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;