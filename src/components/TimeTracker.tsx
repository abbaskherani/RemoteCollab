import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, StopCircle } from 'lucide-react'

interface Task {
  id: number
  name: string
}

export default function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const tasks: Task[] = [
    { id: 1, name: "Website Redesign" },
    { id: 2, name: "Mobile App Development" },
    { id: 3, name: "API Integration" },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    if (selectedTask) {
      setIsTracking(!isTracking)
    }
  }

  const handleReset = () => {
    setIsTracking(false)
    setElapsedTime(0)
  }

  return (
    <div className='max-w-2xl mx-auto'>
    <Card className="bg-white shadow-md ">
      <CardHeader className="bg-blue-600 text-white ">
        <CardTitle>Time Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 py-4">
          <Select onValueChange={(value) => setSelectedTask(Number(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.id} value={task.id.toString()}>{task.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-4xl font-bold text-center mb-4 text-blue-600">
          {formatTime(elapsedTime)}
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={handleStartStop} className={isTracking ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}>
            {isTracking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isTracking ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleReset} className="bg-red-500 hover:bg-red-600">
            <StopCircle className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}