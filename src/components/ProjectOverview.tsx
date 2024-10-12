import React from 'react'
import { BarChart2 } from 'lucide-react'

interface Project {
  id: number
  name: string
  progress: number
  deadline: string
}

const ProjectOverview: React.FC = () => {
  const projects: Project[] = [
    { id: 1, name: "Website Redesign", progress: 75, deadline: "2023-08-15" },
    { id: 2, name: "Mobile App Development", progress: 40, deadline: "2023-09-30" },
    { id: 3, name: "API Integration", progress: 90, deadline: "2023-07-31" },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex items-center mb-4">
        <BarChart2 className="text-indigo-600 mr-2" size={24} />
        <h2 className="text-xl font-semibold">Project Overview</h2>
      </div>
      {projects.map((project) => (
        <div key={project.id} className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{project.name}</span>
            <span className="text-sm text-gray-500">Due: {project.deadline}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">{project.progress}% Complete</div>
        </div>
      ))}
    </div>
  )
}

export default ProjectOverview