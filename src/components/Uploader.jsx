import { useState } from 'react'
import { Upload, File, X, AlertCircle } from 'lucide-react'
import { useCompara } from '../store/comparaStore'

const Uploader = ({ label }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const { setDocx1, setDocx2 } = useCompara()

  const acceptedExtensions = ['.docx']

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
    const fileExtension = file.name
      .slice(file.name.lastIndexOf('.'))
      .toLowerCase()

    if (!acceptedExtensions.includes(fileExtension)) {
      setError('Tipo de arquivo não permitido.')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
    label === 'Documento 1' ? setDocx1(file) : setDocx2(file)
    setError(null)
  }

  const removeFile = () => {
    setSelectedFile(null)
    label === 'Documento 1' ? setDocx1(null) : setDocx2(null)

    setError(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const inputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-wt-3 mb-2">
        {label}
      </label>

      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
            ${isDragOver ? 'border-or-1 bg-bk-2' : 'border-gr-2 bg-bk-1'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById(inputId).click()}
        >
          <input
            id={inputId}
            type="file"
            accept={acceptedExtensions.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />

          <Upload
            className={`mx-auto h-12 w-12 ${error ? 'text-or-3' : 'text-gr-2'}`}
          />
          <p className={`mt-2 text-sm ${error ? 'text-or-3' : 'text-wt-3'}`}>
            Clique para selecionar ou arraste um arquivo aqui.
          </p>
          <p className={`text-xs ${error ? 'text-or-3' : 'text-gr-2'}`}>
            Tipos permitidos: {acceptedExtensions.join(', ')}
          </p>

          {error && (
            <div className="mt-2 flex items-center justify-center text-or-3">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gr-2 rounded-lg p-4 bg-bk-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-of-blue-2" />
              <div>
                <p className="text-sm font-medium text-wt-1">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gr-2">
                  {formatFileSize(selectedFile.size)} •{' '}
                  {new Date(selectedFile.lastModified).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-bk-3 transition-colors duration-200"
            >
              <X className="h-4 w-4 text-gr-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Uploader
