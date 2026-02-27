import ScrollFloat from './ui/ScrollFloat'

export default function Contact() {
  return (
    <section id="contact" className="section contact" style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 3rem' }}>
      <p className="section-label" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--cyan)', margin: '0 0 0.5rem 0', fontWeight: 600 }}>GET IN TOUCH</p>
      <div className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text)' }}>
        <ScrollFloat>Let's work together.</ScrollFloat>
      </div>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 3rem 0', maxWidth: '40ch' }}>I'm open to freelance projects, collaborations, and creative opportunities.</p>
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 0.75rem 0', color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, boxShadow: '0 0 10px rgba(0,229,255,0.3)' }} />
          <a href="mailto:saadtajamul5@gmail.com">saadtajamul5@gmail.com</a>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 0.75rem 0', color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, boxShadow: '0 0 10px rgba(0,229,255,0.3)' }} />
          +92 334 9291265
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0, boxShadow: '0 0 10px rgba(0,229,255,0.3)' }} />
          Karachi, Pakistan
        </p>
      </div>
     
    </section>
  )
}
