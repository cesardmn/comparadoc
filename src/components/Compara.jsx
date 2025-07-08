import { GitCompare } from 'lucide-react'
import Uploader from './Uploader'
import Diff from './Diff'

const Compara = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <GitCompare className="h-8 w-8 text-or-3 mr-3" />
      <div>
        <h1 className="text-2xl font-bold text-wt-1">Compara DOC</h1>
        <p className="text-sm text-gr-2">
          Compare o texto de 2 (dois) documentos .docx e identifique as
          diferenças.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3>Selecione os documentos a serem comparados</h3>

        <div className="flex gap-4">
          <Uploader label={'Documento 1'} acceptedTypes={['.docx']} />
          <Uploader label={'Documento 2'} acceptedTypes={['.docx']} />
        </div>

        <Diff />
      </div>
    </div>
  )
}

export default Compara
