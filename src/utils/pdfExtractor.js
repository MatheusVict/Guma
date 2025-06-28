import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.mjs'

export async function extractTextFromPDF(file, onProgress = null, abortController = null) {
  const MAX_FILE_SIZE = 50 * 1024 * 1024

  try {
    console.log('Starting PDF text extraction for:', file.name)

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    }

    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    if (onProgress) onProgress(5)

    const arrayBuffer = await file.arrayBuffer()

    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    if (onProgress) onProgress(15)

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    if (onProgress) onProgress(25)

    let fullText = ''
    const totalPages = pdf.numPages

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (abortController?.signal.aborted) {
        throw new Error('Extraction was cancelled')
      }

      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()

      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

      if (pageText) {
        fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`
      }

      const pageProgress = Math.floor((pageNum / totalPages) * 70) + 25
      if (onProgress) onProgress(pageProgress)
    }

    if (onProgress) onProgress(100)

    const result = fullText.trim()
    console.log('PDF text extraction completed, extracted characters:', result.length)

    return result
  } catch (error) {
    console.error('Error extracting text from PDF:', error)

    if (error.message.includes('cancelled')) {
      throw new Error('Extraction was cancelled by user')
    }

    if (error.message.includes('too large')) {
      throw error
    }

    throw new Error('Failed to extract text from PDF. The file might be corrupted, password-protected, or not a valid PDF.')
  }
}

export function isPDFFile(file) {
  return file && file.type === 'application/pdf'
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
