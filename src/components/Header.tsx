import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Video, PenTool, CheckSquare, Home, Menu, X, Clock, FileText, MessageSquare, BarChart2 } from 'lucide-react';

const navItems = [
    { to: "/", icon: <Home size={23} />, label: "Dashboard" },
    { to: "/code-editor", icon: <Code size={23} />, label: "Code Editor" },
    { to: "/video-chat", icon: <Video size={23} />, label: "Video Chat" },
    { to: "/whiteboard", icon: <PenTool size={23} />, label: "Whiteboard" },
    { to: "/tasks", icon: <CheckSquare size={23} />, label: "Tasks" },
    { to: "/time-tracking", icon: <Clock size={23} />, label: "Time Tracking" },
    { to: "/team-chat", icon: <MessageSquare size={23} />, label: "Team Chat" },
    { to: "/project-management", icon: <BarChart2 size={23} />, label: "Project Overview" },
    { to: "/file-sharing", icon: <FileText size={23} />, label: "File Sharing" },
  ];


const Header: React.FC = () => {

        const [isMenuOpen, setIsMenuOpen] = useState(false)
      
        const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen)
        }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
      <button
            className="lg:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        <ul className="hidden lg:flex items-center space-x-5">
            {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className='flex item-center space-x-1 '>
              {item.icon}
              <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {isMenuOpen && (
          <ul className="mt-4 space-y-2 lg:hidden">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

    </header>
  );
};

export default Header;


