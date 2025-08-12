import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="title">PDF Tools — Image & PDF Conversions</h1>
      <p className="lead">Convert images to a single PDF or extract PDF pages as images — completely in your browser.</p>

      <div className="grid">
        <div className="card">
          <h2>Image → PDF</h2>
          <p>Combine JPG/PNG/WebP images into one PDF. Choose page size and orientation.</p>
          <Link href="/image-to-pdf"><a className="btn">Open tool</a></Link>
        </div>
        <div className="card">
          <h2>PDF → Images</h2>
          <p>Extract PDF pages as JPG, PNG or WebP images. Choose output format and scale.</p>
          <Link href="/pdf-to-image"><a className="btn">Open tool</a></Link>
        </div>
      </div>

      <section className="how">
        <h3>How it works</h3>
        <ol>
          <li>Files are processed locally in your browser; nothing is uploaded.</li>
          <li>Select files, set options, and click Convert.</li>
          <li>Download results immediately.</li>
        </ol>
      </section>
    </div>
  )
}
