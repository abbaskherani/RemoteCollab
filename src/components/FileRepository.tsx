import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload } from 'lucide-react'

interface File {
  id: number
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadDate: string
  content: string // Base64 encoded file content
}

export default function FileRepository() {
  const [files, setFiles] = useState<File[]>([
    { id: 1, name: "Project_Proposal.pdf", type: "PDF", size: "2.5 MB", uploadedBy: "Alice", uploadDate: "2023-07-01", content: "" },
    { id: 2, name: "Design_Mockups.zip", type: "ZIP", size: "15 MB", uploadedBy: "Bob", uploadDate: "2023-07-05", content: "" },
    { id: 3, name: "Meeting_Notes.docx", type: "DOCX", size: "500 KB", uploadedBy: "Charlie", uploadDate: "2023-07-10", content: "" },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const newFile: File = {
          id: files.length + 1,
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          uploadedBy: "Current User", // In a real app, this would be the logged-in user
          uploadDate: new Date().toISOString().split('T')[0],
          content: content.split(',')[1] // Remove the data URL prefix
        }
        setFiles([...files, newFile])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = (file: File) => {
    const link = document.createElement('a')
    link.href = `data:${file.type};base64,${file.content}`
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle>File Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
            <Button 
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" /> Upload File
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Size</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Uploaded By</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Upload Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {file.type} • {file.size} • {file.uploadedBy} • {file.uploadDate}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{file.type}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{file.size}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{file.uploadedBy}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{file.uploadDate}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(file)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}