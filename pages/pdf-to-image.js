import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'
import JSZip from 'jszip'

export default function PdfToImage() {
  const [file, setFile] = useState(null)
  const [format, setFormat] = useState('png')
  const [scale, setScale] = useState(1.5)
  const [processing, setProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)

  function onFile(e) {
    setFile(e.target.files[0] || null)
    setDownloadUrl(null)
  }

  async function convert() {
    if (!file) return alert('Choose a PDF file first')
    setProcessing(true)
    setDownloadUrl(null)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise
      const zip = new JSZip()

      for (let i=1; i<=pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: Number(scale) })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        await page.render({ canvasContext: ctx, viewport }).promise
        // toBlob with desired format
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/' + format, 1.0))
        zip.file('page-' + i + '.' + format, blob)
      }

      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      setDownloadUrl(url)
    } catch (err) {
      console.error(err)
      alert('Conversion failed: ' + err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      <h1 className="title">PDF → Images</h1>
      <p className="lead">Extract each page of a PDF as an image. Processing happens in your browser.</p>

      <div className="form-row">
        <label className="label">Choose PDF</label>
        <input type="file" accept="application/pdf" onChange={onFile} />
      </div>

      <div className="form-row">
        <label className="label">Output format</label>
        <select value={format} onChange={e=>setFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <label style={{marginLeft:20}}>Scale (1 = native)</label>
        <input type="number" min="0.5" step="0.5" value={scale} onChange={e=>setScale(e.target.value)} style={{width:80}} />
      </div>

      <div className="form-row">
        <button className="btn" onClick={convert} disabled={processing}>
          {processing ? 'Converting…' : 'Convert to Images'}
        </button>
        {downloadUrl && <a className="btn secondary" href={downloadUrl} download="pages.zip" style={{marginLeft:12}}>Download ZIP</a>}
      </div>
    </div>
  )
}
