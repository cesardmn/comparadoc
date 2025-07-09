import { useEffect, useState } from 'react'
import { diffLines, diffWords } from 'diff'
import { useCompara } from '../store/comparaStore'
import { documentParser } from '../utils/documentParser'

function Diff() {
  const { docx1, docx2 } = useCompara()
  const [diff, setDiff] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('side-by-side')

  useEffect(() => {
    async function processDiff() {
      if (!docx1 || !docx2) {
        setDiff([])
        return
      }

      setLoading(true)
      try {
        const parsedDocx1 = await documentParser.parseDocument(docx1)
        const parsedDocx2 = await documentParser.parseDocument(docx2)

        const text1 = parsedDocx1?.text || ''
        const text2 = parsedDocx2?.text || ''

        const result = diffLines(text1, text2)
        setDiff(result)
      } catch (error) {
        console.error('Erro ao processar documentos:', error)
        setDiff([])
      } finally {
        setLoading(false)
      }
    }

    processDiff()
  }, [docx1, docx2])

  const pairedLines = () => {
    const pairs = []
    let i = 0

    while (i < diff.length) {
      const part = diff[i]

      if (!part.added && !part.removed) {
        pairs.push({
          oldLine: part.value,
          newLine: part.value,
          unchanged: true,
        })
        i++
      } else if (part.removed && diff[i + 1]?.added) {
        pairs.push({
          oldLine: part.value,
          newLine: diff[i + 1].value,
          unchanged: false,
        })
        i += 2
      } else if (part.removed) {
        pairs.push({ oldLine: part.value, newLine: '', unchanged: false })
        i++
      } else if (part.added) {
        pairs.push({ oldLine: '', newLine: part.value, unchanged: false })
        i++
      }
    }

    return pairs
  }

  const getStatistics = () => {
    let unchanged = 0
    let added = 0
    let removed = 0

    diff.forEach((part) => {
      const lines = part.value.split('\n').filter(Boolean).length

      if (part.added) {
        added += lines
      } else if (part.removed) {
        removed += lines
      } else {
        unchanged += lines
      }
    })

    const total = unchanged + added + removed
    const similarity = total === 0 ? 100 : Math.round((unchanged / total) * 100)

    return {
      unchanged,
      added,
      removed,
      totalChanges: added + removed,
      total,
      similarityPercentage: similarity,
    }
  }

  const stats = getStatistics()

  const highlightWords = (oldText, newText) => {
    const wordDiff = diffWords(oldText, newText)
    return {
      old: wordDiff.map((part, idx) => {
        if (part.added) return null
        const className = part.removed
          ? 'bg-red-100 text-red-800 line-through px-1 rounded'
          : 'text-gray-800'
        return (
          <span key={`old-${idx}`} className={className}>
            {part.value}
          </span>
        )
      }),
      new: wordDiff.map((part, idx) => {
        if (part.removed) return null
        const className = part.added
          ? 'bg-green-100 text-green-800 px-1 rounded'
          : 'text-gray-800'
        return (
          <span key={`new-${idx}`} className={className}>
            {part.value}
          </span>
        )
      }),
    }
  }

  const renderDiff = () => {
    const lines = pairedLines()
    return lines.map((line, idx) => {
      const { oldLine, newLine, unchanged } = line
      const highlight = unchanged
        ? { old: oldLine, new: newLine }
        : highlightWords(oldLine, newLine)

      return (
        <div
          key={idx}
          className="flex text-sm font-sans border-b border-gray-200 bg-white"
        >
          <div className="w-1/2 border-r border-gray-200 px-4 py-2 whitespace-pre-wrap">
            {unchanged ? (
              <span className="text-gray-800">{highlight.old}</span>
            ) : (
              <span>
                {highlight.old?.length ? highlight.old : <span>&nbsp;</span>}
              </span>
            )}
          </div>
          <div className="w-1/2 px-4 py-2 whitespace-pre-wrap">
            {unchanged ? (
              <span className="text-gray-800">{highlight.new}</span>
            ) : (
              <span>
                {highlight.new?.length ? highlight.new : <span>&nbsp;</span>}
              </span>
            )}
          </div>
        </div>
      )
    })
  }

  const renderUnifiedDiff = () =>
    diff.map((part, idx) => {
      const className = part.added
        ? 'bg-green-100 text-green-800'
        : part.removed
          ? 'bg-red-100 text-red-800 line-through'
          : 'text-gray-800'
      return (
        <span
          key={idx}
          className={`${className} whitespace-pre-wrap block px-4 py-1`}
        >
          {part.value}
        </span>
      )
    })

  const renderInlineMergedDiff = (oldText, newText) => {
    const wordDiff = diffWords(oldText, newText)
    return wordDiff.map((part, idx) => {
      const className = part.added
        ? 'bg-green-100 text-green-800 underline'
        : part.removed
          ? 'bg-red-100 text-red-800 line-through'
          : 'text-gray-800'
      return (
        <span
          key={idx}
          className={`${className} whitespace-pre-wrap px-1 rounded`}
        >
          {part.value}
        </span>
      )
    })
  }

  const renderInlineMergedLines = () => {
    const lines = pairedLines()
    return lines.map((line, idx) => (
      <div
        key={idx}
        className="text-sm font-sans whitespace-pre-wrap py-2 px-4 border-b border-gray-200 bg-white"
      >
        {renderInlineMergedDiff(line.oldLine, line.newLine)}
      </div>
    ))
  }

  if (!docx1 || !docx2) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        Selecione dois documentos DOCX para comparar
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
        Processando comparação...
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg overflow-hidden flex flex-col">
      {/* Estatísticas */}
      <div className="bg-bk-2 p-6 space-y-6 rounded-lg">
        <section aria-labelledby="stats-heading" className="space-y-4">
          <h2 id="stats-heading" className="text-wt-1 font-medium text-lg">
            Resultados da Comparação
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              value={`${stats.similarityPercentage}%`}
              label="Similaridade"
              color="text-or-2"
            />
            <StatCard
              value={stats.added}
              label="Adições"
              color="text-[#6bff8b]"
            />
            <StatCard
              value={stats.removed}
              label="Remoções"
              color="text-[#ff6b6b]"
            />
            <StatCard
              value={stats.totalChanges}
              label="Total de Mudanças"
              color="text-wt-2"
            />
          </div>
        </section>
      </div>

      {/* Botões de visualização */}
      <div className="bg-bk-1 text-gr-3 my-4 px-6 py-4">
        <section aria-labelledby="diff-view-heading">
          <h3
            id="diff-view-heading"
            className="text-wt-1 font-medium text-lg mb-4"
          >
            Modo de Visualização
          </h3>
          <div className="flex flex-wrap gap-3">
            <ViewModeButton
              active={viewMode === 'side-by-side'}
              onClick={() => setViewMode('side-by-side')}
              icon="⇄"
              label="Lado a lado"
            />
            <ViewModeButton
              active={viewMode === 'unified'}
              onClick={() => setViewMode('unified')}
              icon="⇅"
              label="Unificado"
            />
            <ViewModeButton
              active={viewMode === 'inline-merged'}
              onClick={() => setViewMode('inline-merged')}
              icon="↔"
              label="Linha única"
            />
          </div>
        </section>
      </div>

      {/* Resultado da comparação */}
      <div className="bg-et-3 border border-gray-200 shadow-sm select-text">
        {viewMode === 'side-by-side' && (
          <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
            <div className="w-1/2 border-r border-gray-200 px-4 py-2">
              Documento Original
            </div>
            <div className="w-1/2 px-4 py-2">Documento Modificado</div>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto bg-wt-1 ">
          {viewMode === 'side-by-side'
            ? renderDiff()
            : viewMode === 'unified'
              ? renderUnifiedDiff()
              : renderInlineMergedLines()}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ value, label, color, bgColor }) => (
  <div
    className={`${bgColor || ''} p-3 rounded-lg border border-bk-3 shadow-sm`}
  >
    <div className="text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gr-2 mt-1">{label}</div>
    </div>
  </div>
)

const ViewModeButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors border
      ${active ? 'bg-or-3 text-bk-1 font-semibold border-or-2' : 'bg-bk-3 text-wt-2 hover:bg-bk-2 border-transparent'}`}
    aria-pressed={active}
  >
    <span>{icon}</span> <span>{label}</span>
  </button>
)

export default Diff
