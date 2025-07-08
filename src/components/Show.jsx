import { useCompara } from '../store/comparaStore'
import { diffWords } from 'diff'
import React from 'react'

const Show = () => {
  const { matrix } = useCompara()

  const renderLeftDiff = (left, right) => {
    const diffs = diffWords(left, right)
    return diffs.map((part, idx) => {
      const base = ''
      if (part.removed) {
        return (
          <span
            key={idx}
            className={`${base} bg-red-100 text-red-800 line-through font-semibold`}
          >
            {part.value}
          </span>
        )
      }
      if (!part.added) {
        return (
          <span key={idx} className={base}>
            {part.value}
          </span>
        )
      }
      return null
    })
  }

  const renderRightDiff = (left, right) => {
    const diffs = diffWords(left, right)
    return diffs.map((part, idx) => {
      const base = ''
      if (part.added) {
        return (
          <span
            key={idx}
            className={`${base} bg-green-100 text-green-800 font-semibold`}
          >
            {part.value}
          </span>
        )
      }
      if (!part.removed) {
        return (
          <span key={idx} className={base}>
            {part.value}
          </span>
        )
      }
      return null
    })
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Comparação de Parágrafos</h2>

      {matrix.map(([left, right], idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 gap-4 border border-gray-300 rounded-md shadow-sm bg-white p-4"
        >
          {/* Coluna esquerda - Documento 1 */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Parágrafo {idx + 1} - Documento 1
            </p>
            <div className="whitespace-pre-wrap text-gray-800">
              {renderLeftDiff(left, right)}
            </div>
          </div>

          {/* Coluna direita - Documento 2 */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Parágrafo {idx + 1} - Documento 2
            </p>
            <div className="whitespace-pre-wrap text-gray-800">
              {renderRightDiff(left, right)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Show
