import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand"><Link href="/"><a>PDF Tools</a></Link></div>
        <div className="nav-links">
          <Link href="/"><a>Home</a></Link>
          <Link href="/image-to-pdf"><a>Image→PDF</a></Link>
          <Link href="/pdf-to-image"><a>PDF→Images</a></Link>
          <Link href="/how-to-use"><a>How to use</a></Link>
        </div>
      </div>
    </nav>
  )
}
