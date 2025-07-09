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
      setError('Apenas arquivos .docx são suportados')
      setSelectedFile(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError('O arquivo é muito grande (máx. 5MB)')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
    label === 'original' ? setDocx1(file) : setDocx2(file)
    setError(null)
  }

  const removeFile = () => {
    setSelectedFile(null)
    label === 'original' ? setDocx1(null) : setDocx2(null)
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-wt-2">
        {`Importe o documento ${label}:`}
      </label>

      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
            ${isDragOver ? 'border-or-2 bg-bk-3' : 'border-bk-3 bg-bk-2'}
            ${error ? 'border-or-3' : ''}
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

          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload
              className={`h-10 w-10 ${error ? 'text-or-3' : 'text-or-2'}`}
            />
            <div className="space-y-1">
              <p className={`text-sm ${error ? 'text-or-3' : 'text-wt-2'}`}>
                Arraste e solte o arquivo aqui
              </p>
              <p className={`text-xs ${error ? 'text-or-3' : 'text-gr-2'}`}>
                ou clique para selecionar
              </p>
            </div>
            <p className={`text-xs ${error ? 'text-or-3' : 'text-gr-1'}`}>
              Apenas .docx (máx. 5MB)
            </p>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center text-or-3 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-bk-3 rounded-lg p-4 bg-bk-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-or-3/10 rounded-lg text-or-2">
                <File className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-wt-1 truncate max-w-[200px]">
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
              className="p-1 rounded-full hover:bg-bk-3 transition-colors duration-200 text-gr-2 hover:text-wt-1"
              aria-label="Remover arquivo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Uploader
