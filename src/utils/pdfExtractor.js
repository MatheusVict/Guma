import * as pdfjsLib from 'pdfjs-dist'

// Set the worker source - use CDN for development, will be bundled for production
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.mjs'


/**
 * Extract text from a PDF file with progress tracking and cancellation support
 * @param {File} file - The PDF file to extract text from
 * @param {Function} onProgress - Callback function to report progress (0-100)
 * @param {AbortController} abortController - Controller to handle cancellation
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(file, onProgress = null, abortController = null) {
  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB limit

  try {
    console.log('Starting PDF text extraction for:', file.name)

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
    }

    // Check if already aborted
    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    // Report initial progress
    if (onProgress) onProgress(5)

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    if (onProgress) onProgress(15)

    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    if (abortController?.signal.aborted) {
      throw new Error('Extraction was cancelled')
    }

    if (onProgress) onProgress(25)

    let fullText = ''
    const totalPages = pdf.numPages

    // Extract text from each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (abortController?.signal.aborted) {
        throw new Error('Extraction was cancelled')
      }

      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()

      // Combine text items from the page
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim()

      if (pageText) {
        fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`
      }

      // Update progress based on pages processed
      const pageProgress = Math.floor((pageNum / totalPages) * 70) + 25 // 25-95%
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

/**
 * Validate if a file is a PDF
 * @param {File} file - The file to validate
 * @returns {boolean} - True if the file is a PDF
 */
export function isPDFFile(file) {
  return file && file.type === 'application/pdf'
}

/**
 * Get file size in a human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
