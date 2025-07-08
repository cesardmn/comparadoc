import mammoth from 'mammoth'

const supportedTypes = ['docx']

/**
 * Get file extension type
 * @param {File} file
 * @returns {string}
 */
const getFileType = (file) => file.name.split('.').pop().toLowerCase()

/**
 * Check if file is supported
 * @param {File} file
 * @returns {boolean}
 */
const isSupported = (file) => supportedTypes.includes(getFileType(file))

/**
 * Extract paragraphs from raw text
 * @param {string} text
 * @returns {string[]}
 */
const extractParagraphs = (text) =>
  text
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

/**
 * Parse DOCX file using mammoth
 * @param {File} file
 * @returns {Promise<Object>}
 */
const parseDocx = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })

    return {
      text: result.value,
      type: 'docx',
      fileName: file.name,
      size: file.size,
      lastModified: new Date(file.lastModified),
      messages: result.messages,
      paragraphs: extractParagraphs(result.value),
    }
  } catch (error) {
    throw new Error(`Failed to parse DOCX file: ${error.message}`)
  }
}

/**
 * Parse any supported document
 * @param {File} file
 * @returns {Promise<Object>}
 */
const parseDocument = async (file) => {
  const type = getFileType(file)

  switch (type) {
    case 'docx':
      return await parseDocx(file)
    default:
      throw new Error(`Unsupported file type: ${type}`)
  }
}

// Export the API as a plain object
export const documentParser = {
  parseDocument,
  parseDocx,
  extractParagraphs,
  isSupported,
  getFileType,
}

export default documentParser
