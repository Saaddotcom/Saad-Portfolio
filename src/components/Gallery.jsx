const PROJECTS = [
  {
    title: 'Ascension',
    image: '/assets/Ascension.png',
    description: 'A surreal ascent concept built for emotional storytelling and premium brand mood.'
  },
  {
    title: 'Lost Embrace',
    image: '/assets/Lost Embrace.png',
    description: 'A poetic composition balancing loneliness and warmth with cinematic contrast.'
  },
  {
    title: 'Perspective',
    image: '/assets/Perspective.png',
    description: 'A perspective-driven visual experiment that bends depth and attention.'
  }
]

export default function Gallery() {
  return (
    <section id="gallery" className="story-panel gallery-panel">
      <div className="gallery-headline-wrap">
        <p className="gallery-kicker">Selected work</p>
        <h2 className="gallery-title">Immersive visual concepts</h2>
      </div>
      <div className="gallery-stage">
        {PROJECTS.map((project, index) => (
          <article
            key={project.title}
            className="gallery-item magnetic-target"
            data-index={index}
          >
            <p className="gallery-project-text gallery-project-text-back">
              {project.title}
            </p>
            <img src={project.image} alt={project.title} className="gallery-image" />
            <div className="gallery-copy-wrap">
              <p className="gallery-project-text gallery-project-text-front">{project.title}</p>
              <p className="gallery-description">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
