import { create } from 'zustand'

export const useCompara = create((set) => ({
  docx1: null,
  setDocx1: (docx) => set({ docx1: docx }),

  docx2: null,
  setDocx2: (docx) => set({ docx2: docx }),

  comparaOptions: {
    method: 'words',
    ignoreCase: false,
    ignoreWhitespace: false,
  },
  setComparaOptions: (options) =>
    set((state) => ({
      comparaOptions: {
        ...state.comparaOptions,
        ...options,
      },
    })),

  runCompara: false,
  setRunCompara: (run) => set({ runCompara: run }),

  matrix: [],
  setMatrix: (mat) => set({ matrix: mat }),
}))
