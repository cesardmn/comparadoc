import { GitCompare } from 'lucide-react'
import Uploader from './Uploader'
import Diff from './Diff'

const Compara = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-or-3/10 rounded-lg text-or-2">
          <GitCompare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-wt-1">
            Comparador de Documentos
          </h1>
          <p className="text-gr-2 mt-1">
            Compare o conteúdo de dois arquivos DOCX e identifique as diferenças
            com precisão.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Uploader label={'original'} acceptedTypes={['.docx']} />
          <Uploader label={'modificado'} acceptedTypes={['.docx']} />
        </div>

        <Diff />
      </div>
    </div>
  )
}

export default Compara
