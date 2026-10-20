import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import HeroVideoSlideshow from '@/components/HeroVideoSlideshow';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Link, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowLeft, ArrowRight, Braces, Code2, Compass, Menu, Palette, Search, Smartphone, Video, X } from 'lucide-react';

const queryClient = new QueryClient();

const navItems = [
  ['About us', '/about-us'], ['Academics', '/academics'], ['Digital skills', '/digital-skills'],
  ['Campus life', '/campus-life'], ['News & events', '/news-events'], ['Contact', '/contact-us'],
];
const programmes = [
  { name: 'Early Years', text: 'A warm start built around curiosity, language, play and confidence.', img: 'primary-students.jpg', number: '01' },
  { name: 'Primary', text: 'Strong foundations in literacy, numeracy, discovery and expression.', img: 'classroom-learning.jpg', number: '02' },
  { name: 'Middle School', text: 'Growing independence through deeper questions and broader perspectives.', img: 'reading.jpg', number: '03' },
  { name: 'Secondary School', text: 'Rigorous learning, thoughtful choices and preparation for what comes next.', img: 'secondary-class.jpg', number: '04' },
];
const skills = [
  { title: 'Web Development', desc: 'Build accessible, responsive websites from a first sketch to working pages.', Icon: Code2 },
  { title: 'Software Development', desc: 'Break down problems and bring useful ideas to life through code.', Icon: Braces },
  { title: 'App Development', desc: 'Explore how thoughtful mobile experiences are designed and made.', Icon: Smartphone },
  { title: 'Graphic Designing', desc: 'Use typography, colour and composition to communicate clearly.', Icon: Palette },
  { title: 'Video Editing', desc: 'Shape footage, sound and pacing into purposeful visual stories.', Icon: Video },
  { title: 'Digital Marketing', desc: 'Understand audiences, content and responsible online campaigns.', Icon: Compass },
  { title: 'SEO', desc: 'Learn how useful content and clear structure help people find information.', Icon: Search },
];
const stories = [
  { date: 'Learning in action', title: 'A classroom where questions lead the way', desc: 'From discussion to discovery, students practise making connections across what they learn.', img: 'classroom-learning.jpg' },
  { date: 'Digital studio', title: 'Small ideas, made real', desc: 'Students work together to plan, create and refine digital projects with a clear purpose.', img: 'digital-collaboration.jpg' },
  { date: 'Community', title: 'Making room for every kind of curiosity', desc: 'Learning extends beyond lessons through creative activities, reading and shared experiences.', img: 'school-event.jpg' },
];
const gallery = [
  { img: 'classroom-learning.jpg', title: 'Learning together' }, { img: 'computer-lab.jpg', title: 'Digital studio' },
  { img: 'science-lab.jpg', title: 'Discovery and inquiry' }, { img: 'sports-field.jpg', title: 'Time to play' },
  { img: 'creative-workshop.jpg', title: 'Creative workshop' }, { img: 'project-team.jpg', title: 'Project collaboration' },
  { img: 'reading.jpg', title: 'Independent learning' }, { img: 'school-event.jpg', title: 'A school gathering' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);
  return <>
    <div className="topline"><div className="container topline-inner"><span>A school for thoughtful learners and confident makers</span><span>Curiosity • Creativity • Capability</span></div></div>
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Trenex Digital High School home" data-testid="link-brand-home" onClick={() => setOpen(false)}>
          <img src="/trenex-logo.png" alt="Trenex Digital High School logo" />
          <span>TRENEX<small>DIGITAL HIGH SCHOOL</small></span>
        </Link>
        <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} data-testid={`link-nav-${href.slice(1)}`} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <Link className="nav-cta" href="/admissions" data-testid="link-nav-admissions">Explore admissions <ArrowRight size={15} /></Link>
      </div>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><Link href="/" className="brand" data-testid="link-footer-home"><img src="/trenex-logo.png" alt="" /><span>TRENEX<small>DIGITAL HIGH SCHOOL</small></span></Link><p>A place to build strong foundations, ask better questions and make things that matter.</p></div>
      <div><h3>Explore</h3><div className="footer-links">{navItems.slice(0, 4).map(([label, href]) => <Link key={href} href={href} data-testid={`link-footer-${href.slice(1)}`}>{label}</Link>)}</div></div>
      <div><h3>Learning</h3><div className="footer-links"><Link href="/academics" data-testid="link-footer-academics">Academic programmes</Link><Link href="/digital-skills" data-testid="link-footer-digital">Digital skills</Link><Link href="/campus-life" data-testid="link-footer-campus">Campus life</Link><Link href="/admissions" data-testid="link-footer-admissions">Admissions journey</Link></div></div>
      <div><h3>Start a conversation</h3><p>Have questions about the learning approach or admissions process? Send an enquiry and explore this concept.</p><Link href="/contact-us" className="link-arrow" style={{ color: 'var(--yellow)' }} data-testid="link-footer-contact">Contact us <ArrowRight size={16} /></Link></div>
    </div>
    <div className="container footer-bottom"><span>© Trenex Digital High School · Portfolio concept</span><span>Fictional educational website concept created for portfolio demonstration.</span></div>
  </footer>;
}

function SectionTitle({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><div className="kicker">{eyebrow}</div><h2>{title}</h2></div>{copy && <p>{copy}</p>}{action}</div>;
}

function LearningPurpose() {
  const principles = [
    { title: 'Our mission', text: 'Give every learner strong foundations and room to explore.' },
    { title: 'Our vision', text: 'Young people leave ready to shape ideas and tomorrow.' },
    { title: 'Our approach', text: 'Connect academic depth with creativity and practical digital work.' },
  ];

  return <div className="purpose-grid" aria-label="Mission, vision and educational approach">
    {principles.map((item) => <div className="purpose-item" key={item.title}>
      <span className="kicker">{item.title}</span>
      <p>{item.text}</p>
    </div>)}
  </div>;
}

function EnquiryForm() {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) { setFeedback({ type: 'error', text: 'Please check the required fields and try again.' }); return; }
    const data = new FormData(form);
    const email = String(data.get('email') || '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFeedback({ type: 'error', text: 'Please enter a valid email address.' }); return; }
    setFeedback({ type: 'success', text: 'Thank you for exploring Trenex. Your enquiry is ready in this demo; no information has been sent or stored.' });
    form.reset();
  }
  return <div className="form-layout">
    <div className="form-aside"><div className="kicker">Let’s talk learning</div><h2 className="section-heading" style={{ display: 'block', marginBottom: 16 }}><span style={{ font: "800 clamp(34px,4.4vw,54px)/1.08 Manrope,sans-serif", letterSpacing: '-.055em' }}>A good next step starts with a question.</span></h2><p>Tell us what you would like to know about the programmes, digital learning or admissions journey.</p><div className="demo-note">This is a portfolio demonstration. The form does not send submissions to a real school, and your details are not stored.</div></div>
    <form onSubmit={submit} noValidate data-testid="form-enquiry">
      <div className="form-grid">
        <div className="field"><label htmlFor="enq-name">Parent / guardian name *</label><input id="enq-name" name="name" autoComplete="name" required minLength={2} placeholder="Your name" data-testid="input-name" /></div>
        <div className="field"><label htmlFor="enq-email">Email address *</label><input id="enq-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" data-testid="input-email" /></div>
        <div className="field"><label htmlFor="enq-phone">Phone number</label><input id="enq-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" data-testid="input-phone" /></div>
        <div className="field"><label htmlFor="enq-programme">Programme of interest *</label><select id="enq-programme" name="programme" required defaultValue="" data-testid="select-programme"><option value="" disabled>Select a programme</option>{programmes.map(p => <option key={p.name}>{p.name}</option>)}<option>Digital skills</option><option>General enquiry</option></select></div>
        <div className="field full"><label htmlFor="enq-message">Your message *</label><textarea id="enq-message" name="message" required minLength={8} placeholder="What would you like to find out?" data-testid="input-message" /></div>
        <div className="field full"><button className="btn btn-blue" type="submit" data-testid="button-submit-enquiry">Send an enquiry <ArrowRight size={16} /></button>{feedback && <div className={`feedback ${feedback.type}`} role="status" data-testid={`status-enquiry-${feedback.type}`}>{feedback.text}</div>}</div>
      </div>
    </form>
  </div>;
}

function GallerySection({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const open = (i: number) => setActive(i);
  const step = (dir: number) => setActive(prev => prev === null ? null : (prev + dir + gallery.length) % gallery.length);
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);
  return <>
    <div className="gallery-grid">{(compact ? gallery.slice(0, 6) : gallery).map((item, i) => <button key={item.img} className="gallery-item" type="button" onClick={() => open(i)} aria-label={`View image: ${item.title}`} data-testid={`button-gallery-${i}`}><img src={`/images/${item.img}`} alt={item.title} loading="lazy" /></button>)}</div>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }} data-testid="dialog-gallery">
      <button className="icon-button lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery" data-testid="button-gallery-close"><X /></button>
      <button className="icon-button lightbox-prev" onClick={() => step(-1)} aria-label="Previous image" data-testid="button-gallery-previous"><ArrowLeft /></button>
      <img src={`/images/${gallery[active].img}`} alt={gallery[active].title} />
      <button className="icon-button lightbox-next" onClick={() => step(1)} aria-label="Next image" data-testid="button-gallery-next"><ArrowRight /></button>
      <div className="lightbox-caption">{gallery[active].title} · {active + 1} of {gallery.length}</div>
    </div>}
  </>;
}

function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const touch = useRef<number | null>(null);
  const next = () => setIndex(i => (i + 1) % stories.length);
  const prev = () => setIndex(i => (i + stories.length - 1) % stories.length);
  const ordered = stories.map((_, i) => stories[(index + i) % stories.length]);
  return <div onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null && Math.abs(e.changedTouches[0].clientX - touch.current) > 45) (e.changedTouches[0].clientX < touch.current ? next() : prev()); touch.current = null; }} data-testid="carousel-news">
    <div className="news-track">{ordered.map((story, i) => <article className="news-card" key={story.title} data-testid={`card-news-${(index + i) % stories.length}`}><img src={`/images/${story.img}`} alt="" loading="lazy" /><div className="news-card-body"><time>{story.date}</time><h3>{story.title}</h3><p>{story.desc}</p></div></article>)}</div>
    <div className="dots" aria-label="Choose news slide">{stories.map((story, i) => <button key={story.title} aria-label={`Show story ${i + 1}`} aria-pressed={i === index} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} data-testid={`button-news-slide-${i}`} />)}</div>
  </div>;
}

function Home() {
  return <main>
    <section className="hero" aria-label="Welcome to Trenex"><HeroVideoSlideshow /><div className="container hero-grid"><div className="eyebrow">A place to grow into what’s next</div><h1>Learn Today.<br />Lead Tomorrow.</h1><p>Academic excellence, creative thinking, and digital skills for a brighter future.</p><div className="hero-actions"><Link className="btn" href="/academics" data-testid="link-hero-academics">Explore Academics <ArrowRight size={16} /></Link><Link className="btn btn-outline" href="/digital-skills" data-testid="link-hero-digital-skills">Discover Digital Skills</Link></div></div><div className="hero-note">Strong foundations. New possibilities.</div></section>
    <section className="section"><div className="container about-grid"><div className="photo-stack"><img src="/images/classroom-learning.jpg" alt="Students learning together at a classroom table" /><div className="photo-label">LEARNING WITH PURPOSE</div></div><div className="split-copy"><div className="kicker">A school for the whole learner</div><h2>Grounded in learning.<br />Open to possibility.</h2><p>Trenex brings a thoughtful academic education together with practical digital learning. We believe strong foundations and future-ready skills belong side by side.</p><p>Here, students are encouraged to ask thoughtful questions, take creative risks and learn how to turn an idea into something useful.</p><LearningPurpose /><Link href="/about-us" className="link-arrow" data-testid="link-about-story">Get to know Trenex <ArrowRight size={16} /></Link></div></div></section>
    <section className="quicklinks"><div className="container quick-grid">{[['Academic programmes','Learning at every stage','/academics'],['Digital skills','Make ideas work','/digital-skills'],['Campus life','A place to belong','/campus-life'],['Admissions','Plan your next step','/admissions']].map(([title, sub, href], i) => <Link className="quick-link" href={href} key={title} data-testid={`link-quick-${i}`}><span><b>{title}</b><small>{sub}</small></span><ArrowRight size={17} /></Link>)}</div></section>
    <section className="section programmes"><div className="container"><SectionTitle eyebrow="Academic programmes" title="Ready for every next step." copy="A connected learning journey that meets students where they are and helps them discover where they can go." /><div className="program-grid">{programmes.map(p => <Link key={p.name} href="/academics" className="program-card" data-testid={`card-program-${p.number}`}><img src={`/images/${p.img}`} alt="" loading="lazy" /><span>{p.name}<small>{p.text}</small></span></Link>)}</div><Link href="/academics" className="link-arrow" data-testid="link-all-programmes">Explore academic programmes <ArrowRight size={16} /></Link></div></section>
    <section className="section digital-band"><div className="container digital-inner"><SectionTitle eyebrow="Practical digital learning" title="Learn the tools. Make the thing." copy="Digital skills are a distinct part of the Trenex learning experience: a hands-on space to practise, create and share." /><div className="skills-grid">{skills.map(({ title, desc, Icon }, i) => <article key={title} className="skill-card" data-testid={`card-skill-${i}`}><Icon className="skill-icon" /><b>{title}</b><p>{desc}</p></article>)}</div><Link href="/digital-skills" className="link-arrow" style={{ color: 'var(--yellow)' }} data-testid="link-digital-skills">Explore digital skills <ArrowRight size={16} /></Link></div></section>
    <section className="section"><div className="container why-grid"><img className="why-photo" src="/images/digital-collaboration.jpg" alt="Learners collaborating around a computer" loading="lazy" /><div className="split-copy"><div className="kicker">Why Trenex</div><h2>More than what’s on the timetable.</h2><p>Good learning gives students knowledge and the confidence to use it. At Trenex, a clear academic core meets the habits and tools that help young people navigate a changing world.</p><div className="reason-list"><div className="reason"><b>Solid foundations</b><p>Core learning that builds understanding, one idea at a time.</p></div><div className="reason"><b>Learning by making</b><p>Practical opportunities to try, improve and make work with purpose.</p></div><div className="reason"><b>Room to be curious</b><p>Creative thinking and thoughtful questions are part of the process.</p></div><div className="reason"><b>Skills for what’s next</b><p>Digital fluency alongside the human skills every learner needs.</p></div></div></div></div></section>
    <section className="section campus-strip"><div className="container"><SectionTitle eyebrow="Campus & facilities" title="Spaces that make room to explore." copy="A learning environment is more than its walls. It is the feeling of having space to focus, collaborate, experiment and play." /><div className="campus-layout"><Link href="/campus-life" className="campus-feature" data-testid="link-campus-main"><img src="/images/campus.jpg" alt="A welcoming school campus framed by green lawns" loading="lazy" /><h3>A campus for many ways to learn</h3></Link><div className="campus-tiles"><Link href="/campus-life" className="campus-tile" data-testid="link-campus-digital"><img src="/images/computer-lab.jpg" alt="Hands-on learning with a computer" loading="lazy" /><h3>Digital studio</h3></Link><Link href="/campus-life" className="campus-tile" data-testid="link-campus-discovery"><img src="/images/science-lab.jpg" alt="Laboratory equipment for discovery" loading="lazy" /><h3>Discovery spaces</h3></Link></div></div><Link href="/campus-life" className="link-arrow" data-testid="link-campus-life">Explore campus life <ArrowRight size={16} /></Link></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="News & events" title="A window into learning." copy="Stories and moments that offer a glimpse of what learning can look and feel like at Trenex." action={<div className="carousel-controls"><button className="icon-button" aria-label="Previous story" onClick={() => document.querySelector<HTMLButtonElement>('[data-testid="carousel-news"] button[aria-label^="Show story"]')?.click()} data-testid="button-news-prev"><ArrowLeft size={18} /></button><button className="icon-button" aria-label="Next story" onClick={() => { const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-testid="carousel-news"] button[aria-label^="Show story"]')]; const active = buttons.findIndex(b => b.getAttribute('aria-pressed') === 'true'); buttons[(active + 1) % buttons.length]?.click(); }} data-testid="button-news-next"><ArrowRight size={18} /></button></div>} /><NewsCarousel /><Link href="/news-events" className="link-arrow" data-testid="link-news-all">More stories & events <ArrowRight size={16} /></Link></div></section>
    <section className="section-sm programmes"><div className="container"><SectionTitle eyebrow="Student projects" title="Learning you can see." copy="Projects bring disciplines together. Students plan, test, create and learn from the work they put into the world." /><div className="project-feature"><img src="/images/project-team.jpg" alt="A team collaborating on laptops around a work table" loading="lazy" /><div className="project-copy"><div className="eyebrow">From idea to iteration</div><h3>Make a question tangible.</h3><p>Whether a digital prototype, a visual story or a group investigation, project work helps learners connect knowledge to action.</p><Link href="/digital-skills" className="link-arrow" style={{ color: 'var(--yellow)' }} data-testid="link-projects">See the digital learning approach <ArrowRight size={16} /></Link></div></div></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="A little of Trenex" title="Learning has many frames." copy="A few glimpses of the spaces, people and ideas that make a school day." action={<Link href="/campus-life" className="link-arrow" data-testid="link-gallery-campus">Campus life <ArrowRight size={16} /></Link>} /><GallerySection compact /></div></section>
    <section className="section-sm admissions-cta"><div className="container cta-inner"><div><h2>Take the next step, at your pace.</h2><p>Explore the admissions journey and find the information that matters to your family.</p></div><Link href="/admissions" className="btn" data-testid="link-cta-admissions">Explore admissions <ArrowRight size={16} /></Link></div></section>
    <section className="section enquiry-section"><div className="container"><EnquiryForm /></div></section>
  </main>;
}

const pageContent: Record<string, { title: string; description: string; eyebrow: string; img: string; sectionTitle: string; paragraphs: string[] }> = {
  '/about-us': { eyebrow: 'Who we are', title: 'A school shaped by what learners can become.', description: 'Trenex Digital High School brings academic depth and practical digital learning together in one thoughtful education.', img: 'classroom-learning.jpg', sectionTitle: 'A connected view of education', paragraphs: ['We see education as both a foundation and an invitation: a way to understand the world, and a way to imagine how it might be different.', 'Our approach balances core academic learning with creative practice, collaboration and digital capability. Students are encouraged to engage with ideas, not simply receive them.', 'Trenex is a fictional school concept created to demonstrate a considered, family-facing school website. The learning vision and information presented here are illustrative.'] },
  '/academics': { eyebrow: 'Academic programmes', title: 'Strong foundations. Meaningful next steps.', description: 'A purposeful academic journey from the first questions of Early Years through the growing independence of Secondary School.', img: 'secondary-class.jpg', sectionTitle: 'Learning through every stage', paragraphs: ['Each stage is designed around the changing needs of learners: building confidence early, strengthening core knowledge and encouraging students to think with increasing independence.', 'Across programmes, students develop literacy, numeracy, scientific understanding, communication and creative problem-solving. The details of curriculum and progression shown here are illustrative for this portfolio concept.', 'Explore the four programme stages below.'] },
  '/digital-skills': { eyebrow: 'Digital skills', title: 'From digital confidence to digital creation.', description: 'Practical digital learning helps students understand how tools work and use them thoughtfully to make, communicate and solve.', img: 'web-development.jpg', sectionTitle: 'A studio for practical learning', paragraphs: ['Digital skills at Trenex are distinct from the academic programme: a dedicated, applied strand where students practise the tools and ways of thinking behind modern creative work.', 'Learning is introduced in age-appropriate ways, with attention to responsible technology use, clear communication, iteration and collaboration. The topics below illustrate the breadth of the digital programme.'] },
  '/campus-life': { eyebrow: 'Campus life', title: 'A place to focus, explore and belong.', description: 'The school day is made from more than lessons: shared spaces, new interests, movement and moments of discovery.', img: 'campus.jpg', sectionTitle: 'Spaces for different kinds of learning', paragraphs: ['A thoughtful campus supports many rhythms: focused independent study, lively collaboration, practical experimentation and time outdoors.', 'The photography on this page is illustrative of learning environments and activities; it does not represent a verified Trenex campus. In this concept, the school day makes space for both purposeful work and a connected community.'] },
  '/admissions': { eyebrow: 'Admissions', title: 'A clear, considered way to begin.', description: 'Explore the learning approach, ask your questions and take the next step when it feels right for your family.', img: 'reading.jpg', sectionTitle: 'Start with a conversation', paragraphs: ['Choosing a school begins with understanding what matters to your family. We invite families in this concept to explore the programmes, consider the learning approach and share questions through the enquiry form.', 'This portfolio demonstration does not represent a real school, intake calendar, fee structure or admissions policy. The steps below are a simple guide to how a welcoming admissions journey could feel.'] },
  '/news-events': { eyebrow: 'News & events', title: 'Small moments. Bigger ideas.', description: 'Stories, activities and learning moments offer a sense of the questions and creativity that fill a school day.', img: 'school-event.jpg', sectionTitle: 'Stories from the learning journey', paragraphs: ['The stories in this concept are illustrative snapshots rather than announcements of real events. They celebrate the process of learning: working together, trying something new and finding meaning in the everyday.', 'Use the carousel below to browse a few example stories.'] },
  '/contact-us': { eyebrow: 'Contact Trenex', title: 'Let’s begin with what you’d like to know.', description: 'Questions about the learning approach, programmes or admissions journey? Start a conversation in the enquiry form.', img: 'digital-collaboration.jpg', sectionTitle: 'We’re here to listen', paragraphs: ['Use the enquiry form to share a question or indicate a programme of interest. The form is a demonstration only and does not send information to a real school.', 'No real address, telephone number or school contact details are represented here.'] },
};

function PageHero({ page }: { page: typeof pageContent[string] }) {
  return <section className="page-hero"><div className="container"><div className="crumb">Home&nbsp; / &nbsp;{page.eyebrow}</div><div className="eyebrow">{page.eyebrow}</div><h1>{page.title}</h1><p>{page.description}</p></div></section>;
}

function DetailPage({ path }: { path: string }) {
  const page = pageContent[path];
  const [location] = useLocation();
  useEffect(() => {
    document.title = 'Trenex Digital High School';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', page.description);
    window.scrollTo(0, 0);
  }, [path, location]);
  return <main><PageHero page={page} /><section className="section"><div className="container content-grid"><img src={`/images/${page.img}`} alt="" /><div className="split-copy"><div className="kicker">{page.eyebrow}</div><h2>{page.sectionTitle}</h2>{page.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{path === '/about-us' && <LearningPurpose />}</div></div></section>
    {path === '/academics' && <section className="section programmes"><div className="container"><SectionTitle eyebrow="The journey" title="Four stages, one connected purpose." copy="A broad and balanced educational experience should feel responsive to the age and interests of each learner." /><div className="program-grid">{programmes.map(p => <article className="program-card" key={p.name} data-testid={`card-program-${p.number}`}><img src={`/images/${p.img}`} alt="" loading="lazy" /><span>{p.name}<small>{p.text}</small></span></article>)}</div></div></section>}
    {path === '/digital-skills' && <section className="section digital-band"><div className="container digital-inner"><SectionTitle eyebrow="Explore the disciplines" title="Seven ways to make an idea real." copy="Each area pairs practical tools with the thinking behind good digital work." /><div className="skills-grid">{skills.map(({ title, desc, Icon }, i) => <article key={title} className="skill-card" data-testid={`card-skill-${i}`}><Icon className="skill-icon" /><b>{title}</b><p>{desc}</p></article>)}</div></div></section>}
    {path === '/campus-life' && <section className="section programmes"><div className="container"><SectionTitle eyebrow="Spaces that invite discovery" title="A school day, in many settings." /><div className="campus-layout"><div className="campus-feature"><img src="/images/computer-lab.jpg" alt="Students working at a computer" /><h3>Digital studio</h3></div><div className="campus-tiles"><div className="campus-tile"><img src="/images/science-lab.jpg" alt="Science equipment" /><h3>Science & inquiry</h3></div><div className="campus-tile"><img src="/images/sports-field.jpg" alt="Open sports field" /><h3>Movement & play</h3></div></div></div></div></section>}
    {path === '/news-events' && <section className="section programmes"><div className="container"><SectionTitle eyebrow="Browse stories" title="Learning, from more than one angle." /><NewsCarousel /></div></section>}
    {path === '/admissions' && <section className="section programmes"><div className="container"><SectionTitle eyebrow="A simple starting point" title="Three thoughtful steps." /><div className="reason-list"><div className="reason"><b>01 — Explore</b><p>Read about the academic programmes and digital learning approach.</p></div><div className="reason"><b>02 — Ask</b><p>Share your questions using the enquiry form below.</p></div><div className="reason"><b>03 — Consider</b><p>Reflect on what matters to your learner and family.</p></div><div className="reason"><b>Illustrative only</b><p>No actual application, enrolment process or dates are provided in this demo.</p></div></div></div></section>}
    {(path === '/admissions' || path === '/contact-us') && <section className="section enquiry-section"><div className="container"><EnquiryForm /></div></section>}
    {path === '/about-us' && <section className="section-sm admissions-cta"><div className="container cta-inner"><div><h2>Learning for today, possibility for tomorrow.</h2><p>Explore how academic learning and digital capability can work together.</p></div><Link href="/academics" className="btn" data-testid="link-about-academics">Explore programmes <ArrowRight size={16} /></Link></div></section>}
  </main>;
}

function HomeWithMeta() {
  useEffect(() => { document.title = 'Trenex Digital High School'; }, []);
  return <Home />;
}
function Shell({ children }: { children: ReactNode }) { return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /></div>; }

function Router() {
  const [location] = useLocation();
  return <RoutedErrorBoundary><Shell><div id="main-content"><Switch>
    <Route path="/" component={HomeWithMeta} />
    <Route path="/about-us"><DetailPage path="/about-us" /></Route>
    <Route path="/academics"><DetailPage path="/academics" /></Route>
    <Route path="/digital-skills"><DetailPage path="/digital-skills" /></Route>
    <Route path="/campus-life"><DetailPage path="/campus-life" /></Route>
    <Route path="/admissions"><DetailPage path="/admissions" /></Route>
    <Route path="/news-events"><DetailPage path="/news-events" /></Route>
    <Route path="/contact-us"><DetailPage path="/contact-us" /></Route>
    <Route><div className="not-found"><div><h1>Not found</h1><p>That page isn’t part of this learning journey.</p><Link href="/" className="btn btn-blue" data-testid="link-not-found-home">Return home <ArrowRight size={16} /></Link></div></div></Route>
  </Switch></div></Shell></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
