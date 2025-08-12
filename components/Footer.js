export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} PDF Tools — Files are processed locally in your browser.
      </div>
    </footer>
  )
}
