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
          ? 'bg-[#ffe5e5] text-[#a30000] line-through'
          : 'text-black'
        return (
          <span key={`old-${idx}`} className={className}>
            {part.value}
          </span>
        )
      }),
      new: wordDiff.map((part, idx) => {
        if (part.removed) return null
        const className = part.added
          ? 'bg-[#e0ffe5] text-[#006b2e]'
          : 'text-black'
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
          className=" w-full flex text-[13px] font-mono border-b border-[#dcdcdc] bg-[#f9f9f9] text-black"
        >
          <div className="w-1/2 border-r border-[#ccc] px-3 py-1 whitespace-pre-wrap bg-[#ffffff] text-black">
            {unchanged ? (
              <span>{highlight.old}</span>
            ) : (
              <span>{highlight.old.length ? highlight.old : <>&nbsp;</>}</span>
            )}
          </div>
          <div className="w-1/2 px-3 py-1 whitespace-pre-wrap bg-[#fcfcfc] text-black">
            {unchanged ? (
              <span>{highlight.new}</span>
            ) : (
              <span>{highlight.new.length ? highlight.new : <>&nbsp;</>}</span>
            )}
          </div>
        </div>
      )
    })
  }

  const renderUnifiedDiff = () =>
    diff.map((part, idx) => {
      const className = part.added
        ? 'bg-[#e0ffe5] text-[#006b2e]'
        : part.removed
          ? 'bg-[#ffe5e5] text-[#a30000] line-through'
          : 'text-black'
      return (
        <span key={idx} className={`${className} whitespace-pre-wrap`}>
          {part.value}
        </span>
      )
    })

  const renderInlineMergedDiff = (oldText, newText) => {
    const wordDiff = diffWords(oldText, newText)
    return wordDiff.map((part, idx) => {
      const className = part.added
        ? 'bg-[#e0ffe5] text-[#006b2e] underline'
        : part.removed
          ? 'bg-[#ffe5e5] text-[#a30000] line-through'
          : 'text-black'
      return (
        <span key={idx} className={`${className} whitespace-pre-wrap`}>
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
        className="text-[13px] font-mono whitespace-pre-wrap py-1 border-b border-[#dcdcdc] text-black"
      >
        {renderInlineMergedDiff(line.oldLine, line.newLine)}
      </div>
    ))
  }

  if (!docx1 || !docx2) {
    return (
      <div className="p-4 italic text-[#555]">Aguardando documentos...</div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 italic text-[#555]">
        Processando diff linha a linha...
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto my-4 border border-[#ccc] rounded shadow bg-white text-black">
      {/* Estatísticas */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-800">
              {stats.similarityPercentage}%
            </div>
            <div className="text-sm text-blue-600">Similarity</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {stats.added}
            </div>
            <div className="text-sm text-green-600">Additions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {stats.removed}
            </div>
            <div className="text-sm text-red-600">Deletions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-700">
              {stats.totalChanges}
            </div>
            <div className="text-sm text-gray-600">Total Changes</div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 p-2 bg-[#f2f2f2] border-b border-[#ccc]">
        <button
          onClick={() => setViewMode('side-by-side')}
          className={`px-3 py-1 text-sm rounded border ${
            viewMode === 'side-by-side'
              ? 'bg-[#0057d9] text-white'
              : 'bg-white text-black border-[#aaa]'
          }`}
        >
          Lado a lado
        </button>
        <button
          onClick={() => setViewMode('unified')}
          className={`px-3 py-1 text-sm rounded border ${
            viewMode === 'unified'
              ? 'bg-[#0057d9] text-white'
              : 'bg-white text-black border-[#aaa]'
          }`}
        >
          Unificado
        </button>
        <button
          onClick={() => setViewMode('inline-merged')}
          className={`px-3 py-1 text-sm rounded border ${
            viewMode === 'inline-merged'
              ? 'bg-[#0057d9] text-white'
              : 'bg-white text-black border-[#aaa]'
          }`}
        >
          Linha única
        </button>
      </div>

      {/* Cabeçalho lado a lado */}
      {viewMode === 'side-by-side' && (
        <div className="flex border-b bg-[#f0f0f0] text-xs font-bold text-[#444] uppercase">
          <div className="w-1/2 border-r px-3 py-2 border-[#ccc]">Original</div>
          <div className="w-1/2 px-3 py-2">Modificado</div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed text-black">
        {viewMode === 'side-by-side'
          ? renderDiff()
          : viewMode === 'unified'
            ? renderUnifiedDiff()
            : renderInlineMergedLines()}
      </div>
    </div>
  )
}

export default Diff
