import { useState } from 'react'
import { Upload, File, X, AlertCircle } from 'lucide-react'

const FileUploader = ({
  onFileSelect,
  acceptedTypes = ['.docx'],
  label,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelection(file)
    }
  }

  const handleFileSelection = (file) => {
    setSelectedFile(file)
    onFileSelect(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    onFileSelect(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
            ${
              isDragOver
                ? 'border-blue-500 bg-blue-50'
                : error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${label}`).click()}
        >
          <input
            id={`file-input-${label}`}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />

          <Upload
            className={`mx-auto h-12 w-12 ${error ? 'text-red-400' : 'text-gray-400'}`}
          />
          <p
            className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}
          >
            <span className="font-medium">Click to upload</span> or drag and
            drop
          </p>
          <p className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {acceptedTypes.join(', ')} files only
          </p>

          {error && (
            <div className="mt-2 flex items-center justify-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)} •{' '}
                  {new Date(selectedFile.lastModified).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader
