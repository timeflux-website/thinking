import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Menu,
  PlayCircle,
  Sparkles,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/book', label: 'The Book' },
  { path: '/youtube', label: 'The YouTube Channel' },
  { path: '/timeflux', label: 'The App' },
  { path: '/contact', label: 'Contact' },
];

const siteUrl = 'https://thinkingalongsidemachines.com';

const pageMetadata = {
  '/': {
    title: 'Thinking Alongside Machines | Ovidiu Dulacioiu',
    description:
      'Ovidiu Dulacioiu personal website: practical AI, human agency, Thinking Alongside Machines, the YouTube channel, and TIMEFLUX.',
  },
  '/book': {
    title: 'Thinking Alongside Machines Book | AI, Agency, and Control',
    description:
      'Thinking Alongside Machines by Ovidiu Dulacioiu explores practical AI, decision-making, system design, human agency, risk, value, and control beyond hype and fear.',
  },
  '/youtube': {
    title: 'Thinking Alongside Machines YouTube Channel | Practical AI Beyond the Noise',
    description:
      'The Thinking Alongside Machines YouTube channel makes sense of AI beyond hype and fear, with grounded reflections on how AI systems behave and where human judgement matters.',
  },
  '/timeflux': {
    title: 'TIMEFLUX | Practical Human-in-the-loop AI for Legal Work',
    description:
      'TIMEFLUX is Ovidiu Dulacioiu’s AI-enabled legal technology app for time tracking, fee and task management, planning, reporting, and case-to-invoice workflows.',
  },
  '/contact': {
    title: 'Contact Ovidiu Dulacioiu | Thinking Alongside Machines',
    description:
      'Contact Ovidiu Dulacioiu and find links to LinkedIn, X, the Amazon author page, Thinking Alongside Machines, practical AI work, and TIMEFLUX.',
  },
};

const contactQuestions = [
  {
    question: 'What is your academic background?',
    answer:
      'Ovidiu studied Computer Science in college, then Law at Valahia University. That combination shaped the way he approaches legal technology: with both domain understanding and technical curiosity.',
  },
  {
    question: 'What is your work experience?',
    answer:
      'Ovidiu has worked across product management, AI and innovation, IP management systems, software consulting, and account management. His recent work includes shaping AI-enabled capabilities at Dennemeyer, founding TIMEFLUX, and previously advising on IP software products at Clarivate and Dennemeyer.',
  },
  {
    question: 'What is your legal-tech background?',
    answer:
      'Ovidiu has worked with IP management and analytics platforms used by law firms, in-house IP teams, and corporate clients. He has delivered demonstrations, proofs of concept, requirements scoping, customer validation, and product direction work across complex legal and IP software environments. He also builds AI-enabled legal-tech products with a practical, human-in-the-loop mindset, including intelligent workflows, predictive insights, integrations, and conversational interfaces designed to support real professional work.',
  },
  {
    question: 'What are your main interests around AI?',
    answer:
      'Ovidiu is interested in AI as a practical force inside real systems, not as hype or spectacle. As a product manager, he focuses on AI-enabled workflows, validation, integrations, and user value. Through TIMEFLUX, he applies AI to legal time tracking and billing in ways that support professionals while keeping humans in control. Through the Thinking Alongside Machines channel and book, he explores agency, judgement, risk, and how people can work with AI without giving up responsibility.',
  },
];

const homeMilestones = [
  {
    date: 'June 2025',
    title: 'TIMEFLUX founded',
    description:
      'The practical side of the work: applying AI inside legal workflows where structure, judgement, and human control still matter.',
    path: '/timeflux',
    action: 'Explore the App',
    Icon: Sparkles,
  },
  {
    date: 'April 12, 2026',
    title: 'The book published',
    description:
      'Thinking Alongside Machines explores AI as it exists today: a practical force reshaping decisions, systems, risk, value, and the role of human agency.',
    path: '/book',
    action: 'Explore the Book',
    Icon: BookOpen,
  },
  {
    date: 'May 1, 2026',
    title: 'The channel begins',
    description:
      'The YouTube channel brings the same grounded approach into shorter reflections on how AI systems behave, where they help, and where human judgement still matters.',
    path: '/youtube',
    action: 'Visit the Channel',
    Icon: PlayCircle,
  },
];

function useRoute() {
  const readPath = () => {
    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get('p') || window.location.pathname;
    return nextPath.length > 1 ? nextPath.replace(/\/$/, '') : nextPath;
  };
  const [path, setPath] = React.useState(readPath);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectedPath = params.get('p');

    if (redirectedPath) {
      window.history.replaceState({}, '', redirectedPath);
      setPath(redirectedPath);
    }

    const onPopState = () => setPath(readPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path, navigate };
}

function App() {
  const { path, navigate } = useRoute();
  const activeMetadata = pageMetadata[path] || pageMetadata['/'];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setDocumentMetadata(path, activeMetadata);
  }, [path, activeMetadata]);

  const handleNavLink = (event, nextPath) => {
    handleInternalLink(event, nextPath, navigate);
    setIsMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="mobile-brand-link"
          href="/"
          onClick={(event) => handleNavLink(event, '/')}
        >
          Thinking Alongside Machines
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={isMenuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              className={
                path === item.path || path.startsWith(`${item.path}/`)
                  ? 'nav-link active'
                  : 'nav-link'
              }
              href={item.path}
              key={item.path}
              onClick={(event) => handleNavLink(event, item.path)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {path === '/book' && <BookPage />}
        {path === '/youtube' && <YouTubePage />}
        {path === '/timeflux' && <TimefluxPage />}
        {path === '/contact' && <ContactPage />}
        {!['/book', '/youtube', '/timeflux', '/contact'].includes(path) && (
          <HomePage navigate={navigate} />
        )}
      </main>
    </div>
  );
}

function handleInternalLink(event, path, navigate) {
  event.preventDefault();
  navigate(path);
}

function setDocumentMetadata(path, metadata) {
  const canonicalPath = path === '/' ? '/' : `${path}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`;

  document.title = metadata.title;
  upsertMeta('name', 'description', metadata.description);
  upsertMeta('name', 'author', 'Ovidiu Dulacioiu');
  upsertMeta('name', 'robots', 'index, follow');
  upsertMeta('property', 'og:site_name', 'Thinking Alongside Machines');
  upsertMeta('property', 'og:title', metadata.title);
  upsertMeta('property', 'og:description', metadata.description);
  upsertMeta('property', 'og:type', path === '/' ? 'website' : 'article');
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('name', 'twitter:card', 'summary');
  upsertMeta('name', 'twitter:title', metadata.title);
  upsertMeta('name', 'twitter:description', metadata.description);
  upsertCanonical(canonicalUrl);
  upsertJsonLd(path, metadata, canonicalUrl);
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function upsertJsonLd(path, metadata, url) {
  let element = document.getElementById('structured-data');

  if (!element) {
    element = document.createElement('script');
    element.id = 'structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(getStructuredData(path, metadata, url));
}

function getStructuredData(path, metadata, url) {
  const person = {
    '@type': 'Person',
    name: 'Ovidiu Dulacioiu',
    alternateName: 'Ovidiu Dulăcioiu',
    url: siteUrl,
    sameAs: [
      'https://www.linkedin.com/in/ovidiu-dulacioiu/',
      'https://x.com/ovi_timeflux',
      'https://www.amazon.co.uk/stores/author/B0D2WG7RZ7',
      'https://www.youtube.com/@ThinkingAlongsideMachines',
      'https://timeflux.co.uk/',
    ],
  };

  if (path === '/book') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Thinking Alongside Machines: AI, Agency, and the Limits of Control',
      description: metadata.description,
      author: person,
      isbn: '979-8253847596',
      inLanguage: 'en',
      datePublished: '2026-04-12',
      url,
    };
  }

  if (path === '/youtube') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Thinking Alongside Machines YouTube Channel',
      description: metadata.description,
      url,
      about: person,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Thinking Alongside Machines',
        url: siteUrl,
      },
    };
  }

  if (path === '/timeflux') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TIMEFLUX',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: metadata.description,
      url: 'https://timeflux.co.uk/',
      creator: person,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': path === '/' ? 'WebSite' : 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url,
    author: person,
  };
}

function HomePage({ navigate }) {
  const [activeMilestone, setActiveMilestone] = React.useState(0);
  const milestone = homeMilestones[activeMilestone];
  const MilestoneIcon = milestone.Icon;
  const moveMilestone = (direction) => {
    setActiveMilestone(
      (current) => (current + direction + homeMilestones.length) % homeMilestones.length
    );
  };

  return (
    <section className="home-page">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="home-content">
        <p className="eyebrow home-eyebrow">Ovidiu Dulacioiu</p>
        <h1>Thinking Alongside Machines</h1>
        <p className="lead">
          A personal hub for practical AI: the book where I explore agency and control, the channel
          where I make sense of AI beyond the noise, and TIMEFLUX, where I apply these ideas in
          legal technology.
        </p>
        <div className="home-actions">
          <a
            className="primary-action"
            href="/book"
            onClick={(event) => handleInternalLink(event, '/book', navigate)}
          >
            <BookOpen size={18} />
            Explore the Book
          </a>
          <a
            className="secondary-action"
            href="/youtube"
            onClick={(event) => handleInternalLink(event, '/youtube', navigate)}
          >
            <PlayCircle size={18} />
            Visit the Channel
          </a>
          <a
            className="secondary-action"
            href="/timeflux"
            onClick={(event) => handleInternalLink(event, '/timeflux', navigate)}
          >
            <Sparkles size={18} />
            Explore the App
          </a>
        </div>
        <div className="milestone-carousel" aria-label="Key milestones">
          <div className="milestone-controls">
            <button
              className="icon-button"
              onClick={() => moveMilestone(-1)}
              type="button"
              aria-label="Previous milestone"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="timeline-dots" aria-hidden="true">
              {homeMilestones.map((item, index) => (
                <span
                  className={index === activeMilestone ? 'timeline-dot active' : 'timeline-dot'}
                  key={item.title}
                />
              ))}
            </div>
            <button
              className="icon-button"
              onClick={() => moveMilestone(1)}
              type="button"
              aria-label="Next milestone"
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <a
            className="milestone-card"
            href={milestone.path}
            onClick={(event) => handleInternalLink(event, milestone.path, navigate)}
            key={milestone.title}
          >
            <span className="milestone-icon">
              <MilestoneIcon size={26} />
            </span>
            <span className="milestone-copy">
              <span className="milestone-date">{milestone.date}</span>
              <span className="milestone-title">{milestone.title}</span>
              <span className="milestone-description">{milestone.description}</span>
              <span className="milestone-action">{milestone.action}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function BookPage() {
  return (
    <section className="content-page book-layout">
      <article className="page-copy standard-copy">
        <div className="page-identity">
          <img
            className="book-logo"
            src="/assets/book-logo.png"
            alt="Thinking Alongside Machines book cover"
          />
          <div>
            <p className="eyebrow">The Book</p>
            <h1>Thinking Alongside Machines: AI, Agency, and the Limits of Control</h1>
          </div>
        </div>
        <p>
          Artificial intelligence is already reshaping how we work, think, and make decisions. But
          understanding its real impact requires moving beyond both hype and fear.
        </p>
        <p>
          Thinking Alongside Machines explores AI as it exists today, not as speculation, but as a
          practical force embedded in real systems. Drawing on hands-on experience, it examines how
          AI changes decision-making, system design, and the role of human agency.
        </p>
        <p>
          Structured as a series of connected essays, the book offers a clear and grounded
          perspective on where AI adds value, where it introduces risk, and how to work with it
          effectively without losing control.
        </p>
        <p>
          For professionals and curious readers alike, this is a guide to making sense of AI as it
          is: complex, useful, still evolving, and far from either fully understood or perfect.
        </p>

        <div className="purchase-links" aria-label="Amazon purchase links">
          <a
            className="primary-action inline-link"
            href="https://www.amazon.co.uk/Thinking-Alongside-Machines-Agency-Control/dp/B0GX14WP83/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.syA8ZpfdIBWlfQAwlka-Qy5OMhlQGhLVdCt_uk2NhK7GjHj071QN20LucGBJIEps.ASRn96OlKi4XHCMBToQxgB9PrpnesI29tIIj8W4f3V0&qid=1787391518&sr=8-1"
            rel="noreferrer"
            target="_blank"
          >
            <BookOpen size={18} />
            Paperback on Amazon
            <ExternalLink size={16} />
          </a>
          <a
            className="secondary-action inline-link"
            href="https://www.amazon.co.uk/Thinking-Alongside-Machines-Agency-Control-ebook/dp/B0H7XSKGX9/ref=tmm_kin_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.syA8ZpfdIBWlfQAwlka-Qy5OMhlQGhLVdCt_uk2NhK7GjHj071QN20LucGBJIEps.ASRn96OlKi4XHCMBToQxgB9PrpnesI29tIIj8W4f3V0&qid=1787391518&sr=8-1"
            rel="noreferrer"
            target="_blank"
          >
            <BookOpen size={18} />
            Kindle on Amazon
            <ExternalLink size={16} />
          </a>
        </div>

        <dl className="book-facts" aria-label="Book details">
          <div>
            <dt>Print length</dt>
            <dd>257 pages</dd>
          </div>
          <div>
            <dt>Language</dt>
            <dd>English</dd>
          </div>
          <div>
            <dt>Publication date</dt>
            <dd>April 12, 2026</dd>
          </div>
          <div>
            <dt>ISBN-13</dt>
            <dd>979-8253847596</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}

function YouTubePage() {
  return (
    <section className="content-page youtube-layout">
      <article className="page-copy standard-copy">
        <div className="page-identity">
          <img
            className="channel-logo"
            src="/assets/youtube-channel-logo.jpg"
            alt="Thinking Alongside Machines channel logo"
          />
          <div>
            <p className="eyebrow">The YouTube channel</p>
            <h1>Thinking Alongside Machines</h1>
          </div>
        </div>
        <p>
          Thinking Alongside Machines is about making sense of AI beyond the noise.
        </p>
        <p>
          Not hype. Not fear. Just a grounded look at how AI systems actually behave, where they
          help, where they fall short, and what that means for the way we think and work.
        </p>
        <p>
          The focus is not just on what AI can do, but on how we use it, how we guide it, and
          where human judgement still matters.
        </p>
        <p>If you&apos;re interested in understanding AI more clearly, this channel is for you.</p>
        <a
          className="primary-action inline-link"
          href="https://www.youtube.com/@ThinkingAlongsideMachines"
          rel="noreferrer"
          target="_blank"
        >
          <PlayCircle size={18} />
          Open YouTube Channel
        </a>
      </article>
    </section>
  );
}

function TimefluxPage() {
  return (
    <section className="content-page timeflux-layout">
      <article className="page-copy standard-copy">
        <img className="timeflux-logo" src="/assets/timeflux-logo.png" alt="TIMEFLUX logo" />
        <p className="eyebrow">The App</p>
        <h1>AI applied where it belongs</h1>
        <p>
          TIMEFLUX is where I put the ideas from Thinking Alongside Machines into practice. It is
          not built around AI for the sake of AI. It uses AI in context: to support legal
          professionals with time tracking, fee and task management, planning, reporting, and the
          movement from case work to invoice.
        </p>
        <p>
          The product is shaped around the same principle I write and speak about: define the
          workflow, constrain the automation, and validate the result. AI can help structure work,
          predict effort, surface useful context, and make everyday legal operations easier to
          manage.
        </p>
        <p>
          But the human remains in the loop. Lawyers and legal teams keep the final say, especially
          where judgement, billing, client context, or more agentic action is involved. TIMEFLUX is
          about useful AI inside a real workflow, with control, accountability, and human decision
          making still at the centre.
        </p>
        <a
          className="primary-action inline-link"
          href="https://timeflux.co.uk/"
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink size={18} />
          Visit TIMEFLUX
        </a>
      </article>
    </section>
  );
}

function ContactPage() {
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [typedAnswer, setTypedAnswer] = React.useState('');

  React.useEffect(() => {
    if (!selectedQuestion) {
      setTypedAnswer('');
      return undefined;
    }

    setTypedAnswer('');
    let index = 0;
    const interval = window.setInterval(() => {
      index += 2;
      setTypedAnswer(selectedQuestion.answer.slice(0, index));

      if (index >= selectedQuestion.answer.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [selectedQuestion]);

  return (
    <section className="content-page contact-page">
      <article className="page-copy standard-copy">
        <div className="page-identity">
          <img
            className="contact-logo"
            src="/assets/ovidiu-dulacioiu.png"
            alt="Ovidiu Dulacioiu"
          />
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Ovidiu Dulacioiu</h1>
          </div>
        </div>
        <p>
          The simplest way to reach me is by email. You can also find my work and updates through
          the links below.
        </p>
        <a className="contact-link" href="mailto:ovidiu.dulacioiu@gmail.com">
          <Mail size={20} />
          ovidiu.dulacioiu@gmail.com
        </a>
        <div className="social-links" aria-label="Other places to find Ovidiu online">
          <a
            className="secondary-action social-link"
            href="https://www.linkedin.com/in/ovidiu-dulacioiu/"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
            <ExternalLink size={16} />
          </a>
          <a
            className="secondary-action social-link"
            href="https://x.com/ovi_timeflux"
            rel="noreferrer"
            target="_blank"
          >
            X
            <ExternalLink size={16} />
          </a>
          <a
            className="secondary-action social-link"
            href="https://www.amazon.co.uk/stores/author/B0D2WG7RZ7"
            rel="noreferrer"
            target="_blank"
          >
            Amazon Author Page
            <ExternalLink size={16} />
          </a>
        </div>
        <section className="contact-chat" aria-label="Quick questions before sending an email">
          <p className="eyebrow">Ask first</p>
          <div className="question-list">
            {contactQuestions.map((item) => (
              <button
                className={
                  selectedQuestion?.question === item.question
                    ? 'question-chip active'
                    : 'question-chip'
                }
                key={item.question}
                onClick={() => setSelectedQuestion(item)}
                type="button"
              >
                {item.question}
              </button>
            ))}
          </div>
          <div className="chat-panel" aria-live="polite">
            {selectedQuestion ? (
              <>
                <p className="chat-question">{selectedQuestion.question}</p>
                <p className="chat-answer">
                  {typedAnswer}
                  {typedAnswer.length < selectedQuestion.answer.length && (
                    <span className="typing-cursor" aria-hidden="true" />
                  )}
                </p>
              </>
            ) : (
              <p className="chat-answer">
                Choose a question above for a quick introduction before sending an email.
              </p>
            )}
          </div>
        </section>
      </article>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
