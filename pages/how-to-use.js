export default function HowToUse() {
  return (
    <div>
      <h1 className="title">How to Use</h1>
      <h2>Image → PDF</h2>
      <ol>
        <li>Open <strong>Image → PDF</strong>.</li>
        <li>Click <em>Choose images</em> and select multiple image files.</li>
        <li>Pick a page size (A4/Letter) and orientation.</li>
        <li>Click <em>Convert to PDF</em>. When finished, click Download.</li>
      </ol>

      <h2>PDF → Images</h2>
      <ol>
        <li>Open <strong>PDF → Images</strong>.</li>
        <li>Choose a PDF file (local).</li>
        <li>Select output image format (PNG/JPG/WEBP) and scale (1 = native, 2 = double resolution).</li>
        <li>Click <em>Convert to images</em>. A ZIP will be prepared for download (client-side).</li>
      </ol>
    </div>
  )
}
