import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

const PAGE_SIZES = {
  A4: [595.28, 841.89],
  LETTER: [612, 792]
}

export default function ImageToPdf() {
  const [files, setFiles] = useState([])
  const [pageSize, setPageSize] = useState('A4')
  const [orientation, setOrientation] = useState('portrait')
  const [processing, setProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)

  function onFiles(e) {
    setDownloadUrl(null)
    setFiles(Array.from(e.target.files || []))
  }

  async function convert() {
    if (!files.length) return alert('Select images first')
    setProcessing(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const [pw, ph] = PAGE_SIZES[pageSize] || PAGE_SIZES.A4
      const pageWidth = orientation === 'landscape' ? ph : pw
      const pageHeight = orientation === 'landscape' ? pw : ph

      for (const f of files) {
        const arrayBuffer = await f.arrayBuffer()
        let embedded
        if (f.type === 'image/png') embedded = await pdfDoc.embedPng(arrayBuffer)
        else embedded = await pdfDoc.embedJpg(arrayBuffer)

        const { width, height } = embedded.scale(1)
        const scale = Math.min((pageWidth - 40) / width, (pageHeight - 40) / height, 1)
        const displayW = width * scale
        const displayH = height * scale
        const page = pdfDoc.addPage([pageWidth, pageHeight])
        const x = (pageWidth - displayW) / 2
        const y = (pageHeight - displayH) / 2
        page.drawImage(embedded, { x, y, width: displayW, height: displayH })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
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
      <h1 className="title">Image → PDF</h1>
      <p className="lead">Combine multiple images into a single PDF. All processing happens in your browser.</p>

      <div className="form-row">
        <label className="label">Choose images</label>
        <input type="file" accept="image/*" multiple onChange={onFiles} />
      </div>

      <div className="form-row">
        <label className="label">Page size</label>
        <select value={pageSize} onChange={e=>setPageSize(e.target.value)}>
          <option value="A4">A4</option>
          <option value="LETTER">Letter</option>
        </select>
        <label style={{marginLeft:20}}>Orientation</label>
        <select value={orientation} onChange={e=>setOrientation(e.target.value)}>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <div className="form-row">
        <button className="btn" onClick={convert} disabled={processing}>
          {processing ? 'Converting…' : 'Convert to PDF'}
        </button>
        {downloadUrl && (
          <a className="btn secondary" href={downloadUrl} download="images.pdf" style={{marginLeft:12}}>Download PDF</a>
        )}
      </div>

      {files.length>0 && (
        <div className="preview">
          <h3>Selected files</h3>
          <div className="thumbs">
            {files.map((f, i)=>(
              <div key={i} className="thumb">
                <img src={URL.createObjectURL(f)} alt={f.name} />
                <div className="fname">{f.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
