import Link from 'next/link'
export default function ToolCard({title, description, link}) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={link}><a className="btn">Open tool</a></Link>
    </div>
  )
}
