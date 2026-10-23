import { useEffect, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Search,
  Plus,
  Minus,
  Globe2,
  GraduationCap,
  BrainCircuit,
  Scale,
  Users,
} from "lucide-react";
import "./App.css";

const SiteRouter = import.meta.env.MODE === "github-pages" ? HashRouter : BrowserRouter;
const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`;
const copyrightYear = new Date().getFullYear();
const visibleCohorts = import.meta.env.VITE_SHOW_FUTURE_COHORTS === "true" ? [1, 2, 3] : [1];
const themes = [
  "Co-adaptation",
  "Agency",
  "Grounding",
];
const themeDescriptions = [
  "How do people and intelligent systems learn and adapt together? We explore how their interaction changes over time, and how this mutual adaptation can support human capability.",
  "How can people retain autonomy and meaningful control when working with intelligent systems? We examine intention, decision-making, responsibility, and accountability in human-AI collaboration.",
  "How can intelligent systems connect to human experience and the world? We bring together perspectives on perception, cognition, embodiment, and context to investigate shared understanding.",
];
const themeQuestions = [
  [
    "What emerges when biological and artificial systems learn together?",
    "What makes their interaction stable or unstable?",
    "How can we recognise adaptation that becomes difficult to reverse?",
  ],
  [
    "When does intelligent assistance strengthen or weaken a person's sense of control?",
    "How does the relationship between intention and outcome change?",
    "What does shared control mean for autonomy and responsibility?",
  ],
  [
    "How should responsibility be understood when people and systems shape an outcome together?",
    "What do consent and cognitive privacy require?",
    "What limits should guide technologies that aim to enhance cognition?",
  ],
];
const projects = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  supervisor: "To be confirmed",
  theme: themes[index % 3],
  university: index % 2 ? "University of Glasgow" : "University of Strathclyde",
}));
const team = [
  { name: "Professor Keith Mathieson", university: "University of Strathclyde", photo: "keith-mathieson.webp", profile: "https://pureportal.strath.ac.uk/en/persons/keith-mathieson/" },
  { name: "Professor Shuzo Sakata", university: "University of Strathclyde", photo: "shuzo-sakata.webp", profile: "https://pureportal.strath.ac.uk/en/persons/shuzo-sakata/" },
  { name: "Professor Aleksandra Vuckovic", university: "University of Glasgow", photo: "aleksandra-vuckovic.jpg", profile: "https://www.gla.ac.uk/schools/engineering/staff/aleksandravuckovic/" },
  { name: "Professor Jonathan Delafield-Butt", university: "University of Strathclyde", photo: "jonathan-delafield-butt.webp", profile: "https://pureportal.strath.ac.uk/en/persons/jonathan-delafield-butt/" },
  { name: "Professor Monika Harvey", university: "University of Glasgow", photo: "monika-harvey.jpg", profile: "https://www.gla.ac.uk/schools/psychologyneuroscience/staff/monikaharvey/" },
  { name: "Professor Guido Noto La Diega", university: "University of Strathclyde", photo: "guido-noto-la-diega.webp", profile: "https://pureportal.strath.ac.uk/en/persons/guido-noto-la-diega/" },
  { name: "Dr William McGeown", university: "University of Strathclyde", photo: "william-mcgeown.webp", profile: "https://pureportal.strath.ac.uk/en/persons/william-mcgeown/" },
  { name: "Dr Emma Gordon", university: "University of Glasgow", photo: "emma-gordon.jpg", profile: "https://www.gla.ac.uk/schools/humanities/staff/emmagordon/" },
  { name: "Dr Brianna Vandrey", university: "University of Glasgow", photo: "1695656485944.jpg", profile: "https://www.gla.ac.uk/schools/psychologyneuroscience/staff/briannavandrey/" },
  { name: "Professor Patricia Connolly", university: "University of Strathclyde", photo: "patricia-connolly.webp", profile: "https://www.strath.ac.uk/staff/connollypatriciaprof/" },
];
function Action({ to, children, light = false }) {
  return (
    <Link className={`action ${light ? "light" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}
function StudyRoutesNotice() {
  return (
    <div className="notice">
      <strong>Two routes to a PhD</strong>
      <p>
        Opportunities may be offered as a four-year PhD or as a one-year
        Master's followed by a four-year PhD (Masters+). Which opportunities
        will follow each route has not yet been confirmed.{" "}
        <Link to="/masters">Learn about the two routes</Link>.
      </p>
    </div>
  );
}
function PageIntro({ eyebrow, title, children }) {
  return (
    <section className="page-intro" style={{ "--banner-image": `url("${imagePath("logo-banner-3.webp")}")` }}>
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {eyebrow}
        </div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
function PartnershipSection() {
  return (
    <section className="partners">
      <div className="container partners-inner">
        <span className="eyebrow">
          A SHARED{" "}
          <br />
          COMMITMENT
        </span>
        <a
          className="university-wordmark strath"
          href="https://www.strath.ac.uk/"
        >
          <img src={imagePath("strathclyde-logo.png")} alt="University of Strathclyde Glasgow" width="205" height="75" loading="lazy" />
        </a>
        <a
          className="university-wordmark glasgow"
          href="https://www.gla.ac.uk/"
        >
          <img src={imagePath("glasgow-logo.svg")} alt="University of Glasgow" width="205" height="75" loading="lazy" />
        </a>
        <a href="https://www.leverhulme.ac.uk/">
          <img
            src={imagePath("leverhulme.png")}
            alt="The Leverhulme Trust"
            width="215"
            height="76"
            loading="lazy"
          />
        </a>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={imagePath("logo-banner-3.webp")}
          alt="Neural branches connecting with electronic circuitry"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-kicker">
            <span />
            A FUNDED LEVERHULME DOCTORAL PROGRAMME
          </div>
          <h1>
            Responsible
            <br />
            Hybrid Intelligence<span className="title-dot">.</span>
          </h1>
          <h2 className="hero-tagline">Understanding intelligence. Together.</h2>
          <p>
            Exploring how people and intelligent systems learn and adapt
            together, responsibly.
          </p>
          <div className="hero-actions">
            <Action to="/projects" light>Explore research opportunities</Action>
            <Link className="hero-programme-link" to="/programme">
              Discover the programme <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <PartnershipSection />
      <section className="recruitment">
        <div className="container recruitment-inner">
          <div className="recruitment-label">
            <span className="status-dot" />
            FIRST-COHORT RECRUITMENT
          </div>
          <div>
            <h2>Your PhD. A new field. A shared future.</h2>
            <p>
              First-cohort studentships: project briefs and application guidance are being finalised.
            </p>
          </div>
          <Link to="/projects">
            Recruitment information <ArrowUpRight size={21} />
          </Link>
        </div>
      </section>
      <section className="intro section container" id="introduction">
        <div>
          <span className="eyebrow">A NEW FIELD. A SHARED VISION.</span>
          <h2>
            What happens when{" "}
            <br />
            humans and AI{" "}
            <br />
            <span className="blue-text"> evolve together?</span>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            We’re bringing people and intelligent systems together, responsibly.
          </p>
          <p>
            As AI and neurotechnology advance, humans and intelligent systems
            will increasingly learn and adapt together. How can we enhance human
            capability while preserving autonomy, agency, and accountability?
          </p>
          <p>
            Our Leverhulme Doctoral Programme brings together the University of
            Strathclyde and the University of Glasgow to establish the
            scientific foundations of Responsible Hybrid Intelligence.
          </p>
          <Link className="text-link" to="/about">
            Meet Responsible Hybrid Intelligence <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="stats container" aria-label="Programme at a glance">
        <div>
          <strong>
            £5<span>m</span>
          </strong>
          <span>Leverhulme Trust award</span>
        </div>
        <div>
          <strong>40</strong>
          <span>PhD researchers</span>
        </div>
        <div>
          <strong>9</strong>
          <span>Years of discovery</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Partner universities</span>
        </div>
      </section>
      <section className="paths section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURIOSITY WITHOUT BOUNDARIES</span>
              <h2>Your next chapter starts here.</h2>
            </div>
            <Link className="text-link" to="/programme">
              Explore the programme <ArrowRight size={18} />
            </Link>
          </div>
          <div className="path-grid">
            <Link className="path-item" to="/projects">
              <span className="path-number">01 / RESEARCH</span>
              <BrainCircuit />
              <h3>Find your PhD</h3>
              <p>
                Explore opportunities at the intersection of human intelligence,
                AI, and responsible innovation.
              </p>
              <span className="path-link">
                View PhD projects <ArrowUpRight size={21} />
              </span>
            </Link>
            <Link className="path-item" to="/masters">
              <span className="path-number">02 / TRAINING</span>
              <GraduationCap />
              <h3>Masters+ pathway</h3>
              <p>
                Explore a Master's-to-doctoral research pathway within our
                interdisciplinary community.
              </p>
              <span className="path-link">
                Explore Masters+ <ArrowUpRight size={21} />
              </span>
            </Link>
            <Link className="path-item" to="/students">
              <span className="path-number">03 / COMMUNITY</span>
              <Users />
              <h3>Belong to something new</h3>
              <p>
                Meet our growing community and discover life as an RHI doctoral
                researcher in Glasgow.
              </p>
              <span className="path-link">
                Meet our students <ArrowUpRight size={21} />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="research-band">
        <div className="container">
          <span className="eyebrow">CONNECTED BY A BIG QUESTION</span>
          <h2>
            Technology that strengthens
            <br />
            what makes us human.
          </h2>
          <div className="theme-list">
            {themes.map((theme, index) => (
              <Link to={`/themes#theme-${index + 1}`} key={theme}>
                <span>0{index + 1}</span>
                {theme}
                <ArrowUpRight size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container news">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM THE PROGRAMME</span>
            <h2>A new beginning.</h2>
          </div>
        </div>
        <div className="news-layout">
          <img
            src={imagePath("glasgow-clyde-skyline.jpg")}
            alt="Glasgow skyline with the illuminated Clyde Arc, Finnieston Crane, and reflections on the River Clyde"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">PROGRAMME NEWS · 04 AUGUST 2026</span>
            <h3>£5 million Leverhulme award for Responsible Hybrid Intelligence</h3>
            <p>
              A £5 million award from The Leverhulme Trust, alongside a further
              £4.1 million investment from the University of Strathclyde and the
              University of Glasgow, will support a new generation of researchers
              shaping the future of human–AI collaboration.
            </p>
            <a
              className="text-link"
              href="https://www.leverhulme.ac.uk/news/centenary-doctoral-scholarships"
              target="_blank"
              rel="noreferrer"
            >
              Read the Trust’s announcement <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <PageIntro eyebrow="About RHI" title="A responsible future, together.">
        Establishing the scientific foundations of a new interdisciplinary
        field.
      </PageIntro>
      <section className="section container prose">
        <h2>Humans and intelligent systems, learning together.</h2>
        <p className="lead">
          Responsible Hybrid Intelligence (RHI) brings together the University of
          Strathclyde and the University of Glasgow to explore how people and
          intelligent systems can learn and adapt together, safely and responsibly.
        </p>
        <p>
          As AI and neurotechnology advance, the relationship between people and
          intelligent systems is changing. Our aim is to understand how this
          collaboration can enhance human capability while preserving autonomy,
          agency, and accountability.
        </p>
        <p>
          Over nine years, our Leverhulme Doctoral Programme will train 40 PhD
          researchers, bringing together expertise in AI, neuroscience,
          neurotechnology, psychology, engineering, philosophy, and law. Through
          this interdisciplinary approach, we will establish the scientific
          foundations of Responsible Hybrid Intelligence and prepare the next
          generation of researchers to shape its future.
        </p>
        <p>
          The programme builds on the complementary strengths of the Strathclyde
          Neurotechnology Centre and Glasgow Neurotechnology Centre, with an equal
          partnership between the two universities. Students, academics, and
          collaborators will work together across disciplines to address the
          scientific and societal questions at the heart of human–AI collaboration.
        </p>
        <p>
          This work is supported by a £5 million award from The Leverhulme Trust
          and a further £4.1 million investment from the University of Strathclyde
          and the University of Glasgow. Their shared commitment enables ambitious,
          curiosity-driven research into a responsible future for hybrid intelligence.
        </p>
      </section>
      <section className="section container">
        <span className="eyebrow">OUR PEOPLE</span>
        <h2>A genuinely interdisciplinary team.</h2>
        <p className="lead">
          Led by Professor Yashar Moshfeghi and Professor Simon Hanslmayr, our team brings
          together the expertise and perspectives that have shaped the programme
          from its earliest conception.
        </p>
        <div className="directors team-leaders">
          <article>
            <img
              className="team-portrait"
              src={imagePath("yashar-moshfeghi.webp")}
              alt="Professor Yashar Moshfeghi"
              width="180"
              height="180"
              loading="lazy"
            />
            <span>PROGRAMME DIRECTOR</span>
            <h3>Professor Yashar Moshfeghi</h3>
            <p>University of Strathclyde</p>
            <a
              className="text-link"
              href="https://www.strath.ac.uk/staff/moshfeghiyashardr/"
            >
              View profile <ArrowUpRight size={16} />
            </a>
          </article>
          <article>
            <img
              className="team-portrait"
              src={imagePath("simon-hanslmayr.jpg")}
              alt="Professor Simon Hanslmayr"
              width="180"
              height="180"
              loading="lazy"
            />
            <span>DEPUTY DIRECTOR</span>
            <h3>Professor Simon Hanslmayr</h3>
            <p>University of Glasgow</p>
            <a
              className="text-link"
              href="https://www.gla.ac.uk/schools/psychologyneuroscience/staff/simonhanslmayr/"
            >
              View profile <ArrowUpRight size={16} />
            </a>
          </article>
        </div>
        <div className="team-list">
          {team.map((person) => (
            <article className="team-member" key={person.name}>
              {person.photo ? <img className="team-portrait" src={imagePath(person.photo)} alt={person.name} width="180" height="180" loading="lazy" /> : <div className="team-portrait portrait-pending"><Users size={32} aria-hidden="true" /><span>Photo coming soon</span></div>}
              <h3>{person.name}</h3>
              <p>{person.university}</p>
              <a className="text-link" href={person.profile} aria-label={`View ${person.name}'s profile`}>View profile <ArrowUpRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function Themes() {
  return (
    <>
      <PageIntro eyebrow="Themes" title="Co-adaptation. Agency. Grounding.">
        The research questions at the heart of Responsible Hybrid Intelligence.
      </PageIntro>
      <section className="section container prose">
        <h2>What the programme explores</h2>
        <p className="lead">Understanding human and artificial intelligence together, rather than in isolation.</p>
        <p>
          Responsible Hybrid Intelligence investigates how people and intelligent
          systems can work, learn, and adapt together while preserving human
          autonomy and accountability. The programme connects AI, neuroscience,
          neurotechnology, psychology, engineering, philosophy, and law across
          Strathclyde and Glasgow.
        </p>
        <p>
          Three connected themes frame this work: how humans and systems change
          through interaction, who retains control and responsibility, and how
          intelligence is grounded in experience and context.
        </p>
      </section>
      <section className="section paths">
        <div className="container path-grid">
          {themes.map((theme, index) => (
            <article className="path-item" id={`theme-${index + 1}`} key={theme}>
              {index === 0 ? <BrainCircuit /> : index === 1 ? <Scale /> : <Globe2 />}
              <h2>{theme}</h2>
              <p>{themeDescriptions[index]}</p>
              <h3 className="theme-question-heading">Questions we ask</h3>
              <ul className="theme-question-list">
                {themeQuestions[index].map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section container prose">
        <h2>Connected questions. Different pathways.</h2>
        <p>Explore the doctoral programme or the Masters+ pathway, then browse the individual research opportunities.</p>
        <div className="hero-actions">
          <Action to="/programme">PhD programme</Action>
          <Action to="/masters">Masters+</Action>
        </div>
      </section>
    </>
  );
}
function Masters() {
  return (
    <>
      <PageIntro eyebrow="Masters+" title="A foundation for doctoral discovery.">
        A Master's-to-PhD pathway in Responsible Hybrid Intelligence.
      </PageIntro>
      <section className="section container prose">
        <span className="eyebrow">MASTERS+ PATHWAY</span>
        <h2>Preparation for interdisciplinary research</h2>
        <p className="lead">There are two routes to doctoral research with us.</p>
        <h3>Four-year PhD</h3>
        <p>
          Start your doctoral research straight away with a four-year PhD
          within the Responsible Hybrid Intelligence programme.
        </p>
        <h3>Masters+: one-year Master's + four-year PhD</h3>
        <p>
          Masters+ adds a one-year Master's before a four-year PhD. It offers a
          preparatory stage before doctoral research in a programme that spans
          human intelligence, intelligent systems, and responsible innovation.
        </p>
        <p>
          Which first-cohort opportunities will be offered through each route
          has not yet been confirmed.
        </p>
        <h3>The Master's stage</h3>
        <p>
          The Master's stage provides a foundation for the proposed doctoral
          research. The specific degree, taught modules, research component,
          and host university will be confirmed in the application guidance.
        </p>
        <h3>Progression to a PhD</h3>
        <p>
          Progression requirements and the relationship between the Master's
          and PhD stages will be set out in the final offer and application
          guidance. Progression should not be assumed to be automatic.
        </p>
        <h3>Eligibility and funding</h3>
        <p>
          Entry qualifications, selection criteria, tuition-fee coverage,
          maintenance support, and home and international eligibility are
          awaiting confirmation. Check the individual opportunity's approved
          terms before applying.
        </p>
        <div className="notice">
          <strong>Detailed guidance is being finalised.</strong>
          <p>Opportunity titles, Master's courses, supervisors, deadlines, and official application links will be published once approved.</p>
        </div>
        <div className="hero-actions">
          <Action to="/projects">View all 11 opportunities</Action>
          <Link className="text-link" to="/programme">Explore the PhD pathway <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
function Programme() {
  return (
    <>
      <PageIntro
        eyebrow="PhD Programme"
        title="Different disciplines. Shared discovery."
      >
        Doctoral research at the intersection of human intelligence, intelligent
        systems, and society.
      </PageIntro>
      <section className="section container intro">
        <div>
          <span className="eyebrow">YOUR RESEARCH JOURNEY</span>
          <h2>
            A PhD with a<br />
            wider perspective.
          </h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            Join an interdisciplinary community across Strathclyde and Glasgow.
          </p>
          <p>
            The programme will train 40 doctoral researchers over nine years,
            connecting expertise in AI, neuroscience, neurotechnology,
            psychology, engineering, philosophy, and law.
          </p>
          <p>
            Our university partnership is shared equally, bringing together the
            complementary strengths of both institutions. Individual project
            allocations will be confirmed with the final project catalogue.
          </p>
          <Action to="/projects">Explore the 11 opportunities</Action>
        </div>
      </section>
      <section className="section paths">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A SHARED RESEARCH COMMUNITY</span>
              <h2>Ideas grow in good company.</h2>
            </div>
          </div>
          <p className="programme-community-intro">
            Doctoral research connects with a wider community across disciplines
            and both universities. Shared learning and opportunities to exchange
            ideas can help researchers bring different perspectives to their work.
          </p>
          <div className="path-grid programme-community-grid">
            <article className="path-item">
              <BrainCircuit />
              <h3>Connect perspectives</h3>
              <p>
                Bring expertise from fields such as AI, neuroscience,
                neurotechnology, psychology, engineering, philosophy, and law
                into conversation.
              </p>
            </article>
            <article className="path-item">
              <GraduationCap />
              <h3>Develop your approach</h3>
              <p>
                Build knowledge and methods around the questions and needs of
                your research.
              </p>
            </article>
            <article className="path-item">
              <Users />
              <h3>Share ideas</h3>
              <p>
                Learn with a doctoral community and explore how research connects
                to wider scientific and societal questions.
              </p>
            </article>
          </div>
          <p className="programme-community-note">
            The format and schedule of cohort activities and training will be
            confirmed in programme guidance.
          </p>
        </div>
      </section>
      <section className="section paths">
        <div className="container">
          <span className="eyebrow">DOCTORAL RESEARCH</span>
          <div className="prose">
            <article>
              <GraduationCap />
              <h2>PhD programme</h2>
              <p>
                Doctoral research within the Responsible Hybrid Intelligence
                programme.
              </p>
              <p>Investigate questions spanning co-adaptation, agency, and grounding, within a community connecting human intelligence, intelligent systems, and society.</p>
              <p className="muted">
                Four-year PhD, or one-year Master's plus four-year PhD through
                Masters+. Training schedule and funding terms to be confirmed.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section container international">
        <Globe2 size={35} />
        <div>
          <span className="eyebrow">A GLOBAL COMMUNITY</span>
          <h2>International perspectives welcome.</h2>
          <p>
            We welcome interest from international candidates. International
            eligibility, fee coverage, visa requirements, and funding
            arrangements will be published with the confirmed application
            guidance.
          </p>
          <Link className="text-link" to="/apply">
            Applicant information <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
function Students() {
  const [cohort, setCohort] = useState(visibleCohorts[0]);
  return (
    <>
      <PageIntro eyebrow="Students" title="Our people. Our shared future.">
        A growing community of researchers, connected by curiosity.
      </PageIntro>
      <section className="section container">
        <span className="eyebrow">MEET THE COHORTS</span>
        <h2>The next generation of RHI.</h2>
        <div
          className="cohort-tabs"
          role="tablist"
          aria-label="Student cohorts"
        >
          {visibleCohorts.map((number, index) => (
            <button
              id={`cohort-tab-${number}`}
              role="tab"
              aria-selected={number === cohort}
              aria-controls="cohort-panel"
              tabIndex={number === cohort ? 0 : -1}
              key={number}
              onClick={() => setCohort(number)}
              onKeyDown={(event) => {
                const next = {
                  ArrowRight: visibleCohorts[(index + 1) % visibleCohorts.length],
                  ArrowLeft: visibleCohorts[(index + visibleCohorts.length - 1) % visibleCohorts.length],
                  Home: visibleCohorts[0],
                  End: visibleCohorts[visibleCohorts.length - 1],
                }[event.key];
                if (next) {
                  event.preventDefault();
                  setCohort(next);
                  document.getElementById(`cohort-tab-${next}`).focus();
                }
              }}
            >
              Cohort 0{number}
              <span>{number === 1 ? "First intake" : "Future intake"}</span>
            </button>
          ))}
        </div>
        <div
          id="cohort-panel"
          role="tabpanel"
          aria-labelledby={`cohort-tab-${cohort}`}
          className="cohort-panel"
        >
          <Users size={40} />
          <h3>
            {cohort === 1
              ? "Meet our first cohort soon."
              : `Cohort 0${cohort} is on the horizon.`}
          </h3>
          <p>
            {cohort === 1
              ? "The first cohort has 11 planned studentships. Student profiles will appear here once recruitment and enrolment are complete."
              : "Recruitment dates and student profiles for this future cohort will be announced in due course."}
          </p>
          {cohort === 1 && (
            <Action to="/projects">Explore first-cohort studentships</Action>
          )}
        </div>
      </section>
    </>
  );
}
function Projects() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("");
  const [university, setUniversity] = useState("");
  const filtered = projects.filter(
    (project) =>
      (!theme || theme === project.theme) &&
      (!university || university === project.university) &&
      `${project.theme} ${project.university} ${project.supervisor} studentship ${project.id}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="PhD Proposals"
        title="11 opportunities. A world of possibility."
      >
        Doctoral opportunities in Responsible Hybrid Intelligence.
      </PageIntro>
      <section className="section container">
        <StudyRoutesNotice />
        <div className="notice">
          <strong>First-cohort recruitment</strong>
          <p>
            The entries below are placeholders, not confirmed research
            projects. Titles, supervisors, host allocations, funding terms, and
            application dates are awaiting approval.
          </p>
        </div>
        <div className="filters">
          <label className="search-field">
            <span>Search projects</span>
            <div>
              <Search size={19} />
              <input
                type="search"
                placeholder="Search by keyword…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </label>
          <label>
            <span>Research theme</span>
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
            >
              <option value="">All themes</option>
              {themes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Host university</span>
            <select
              value={university}
              onChange={(event) => setUniversity(event.target.value)}
            >
              <option value="">Both universities</option>
              <option>University of Strathclyde</option>
              <option>University of Glasgow</option>
            </select>
          </label>
        </div>
        <div className="results-heading">
          <p aria-live="polite">
            <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "studentship" : "studentships"}
          </p>
          {(query || theme || university) && (
            <button
              className="reset"
              onClick={() => {
                setQuery("");
                setTheme("");
                setUniversity("");
              }}
            >
              Clear filters <X size={16} />
            </button>
          )}
          <span>COHORT 01 · PROVISIONAL CATALOGUE</span>
        </div>
        <div className="projects-list">
          {filtered.map((project) => (
            <article className="project" key={project.id}>
              <div className="project-overview">
                <span className="project-index">{String(project.id).padStart(2, "0")}</span>
                <div>
                  <span className="project-theme">{project.theme}</span>
                  <h2>RHI opportunity {String(project.id).padStart(2, "0")}</h2>
                  <p><strong>Lead supervisor:</strong> {project.supervisor}</p>
                  <p><strong>Based at:</strong> {project.university} (placeholder; host to be confirmed)</p>
                </div>
                <Action to={`/projects/${project.id}`}>View details</Action>
              </div>
              <details>
              <summary>
                <span>Research overview</span>
                <span className="detail-toggle">
                  <Plus className="plus" size={22} />
                  <Minus className="minus" size={22} />
                </span>
              </summary>
              <div className="project-content">
                <span className="eyebrow">
                  PROJECT DETAILS AWAITING CONFIRMATION
                </span>
                <p>The approved research brief for this opportunity will appear here. Its current research grouping is {project.theme.toLowerCase()}.</p>
                <dl>
                  <div>
                    <dt>Primary supervisor</dt>
                    <dd>{project.supervisor}</dd>
                  </div>
                  <div>
                    <dt>Research theme</dt>
                    <dd>{project.theme} (indicative)</dd>
                  </div>
                  <div>
                    <dt>Host university</dt>
                    <dd>{project.university} (placeholder)</dd>
                  </div>
                  <div>
                    <dt>Application deadline</dt>
                    <dd>To be announced</dd>
                  </div>
                </dl>
              </div>
              </details>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty">
            <Search size={32} />
            <h2>No matching studentships</h2>
            <p>Try another keyword or clear the filters.</p>
          </div>
        )}
      </section>
    </>
  );
}
function Opportunity() {
  const { projectId } = useParams();
  const project = projects.find((item) => String(item.id) === projectId);
  if (!project) {
    return <section className="section container"><h1>Opportunity not found</h1><Action to="/projects">Return to proposals</Action></section>;
  }
  return (
    <>
      <PageIntro eyebrow="PhD Proposals" title={`RHI opportunity ${String(project.id).padStart(2, "0")}`}>
        {project.theme} · First-cohort opportunity
      </PageIntro>
      <section className="section container prose opportunity-page">
        <StudyRoutesNotice />
        <h2>Opportunity details</h2>
        <dl>
          <div><dt>Route</dt><dd>Four-year PhD or Masters+ (to be confirmed)</dd></div>
          <div><dt>Lead supervisor</dt><dd>{project.supervisor}</dd></div>
          <div><dt>Based at</dt><dd>{project.university} (placeholder; host to be confirmed)</dd></div>
          <div><dt>Research theme</dt><dd>{project.theme} (indicative)</dd></div>
          <div><dt>Application deadline</dt><dd>To be announced</dd></div>
          <div><dt>Funding and eligibility</dt><dd>Awaiting approved terms</dd></div>
        </dl>
        <h2>Research proposal</h2>
        <p>The full title, research questions, methods, and supervisory team will be published here when the project brief is approved.</p>
        <h2>Apply for this opportunity</h2>
        <div className="notice">
          <strong>Applications are not yet open on this website.</strong>
          <p>The official university application link, required documents, selection criteria, and deadline for this specific opportunity will appear here once confirmed. No application is submitted by visiting this page.</p>
        </div>
        <div className="hero-actions">
          <Action to="/masters">Explore the two routes</Action>
          <Link className="text-link" to="/apply">General application guidance <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
function Apply() {
  return (
    <>
      <PageIntro eyebrow="How to Apply" title="Bring your curiosity.">
        Your next step towards Responsible Hybrid Intelligence.
      </PageIntro>
      <section className="section container apply-layout">
        <div>
          <span className="eyebrow">COHORT 01 · 11 STUDENTSHIPS</span>
          <h2>Start your research journey.</h2>
          <p className="lead">
            The programme is preparing its first intake of doctoral researchers.
          </p>
          <div className="notice">
            <strong>Application guidance is being finalised.</strong>
            <p>
              No application form is live on this website yet. Opening dates,
              deadlines, eligibility, stipend, fee coverage, and the official
              submission route will be published once confirmed.
            </p>
          </div>
          <h3>Before you apply</h3>
          <ol className="steps">
            <li>
              <h3>Explore the programme</h3>
              <p>
                Learn about the RHI themes, PhD scholarships, and Masters+
                pathway.
              </p>
            </li>
            <li>
              <h3>Find your research direction</h3>
              <p>
                Browse the provisional studentships catalogue. Final project
                briefs and supervisors are still to be confirmed.
              </p>
            </li>
            <li>
              <h3>Check the final guidance</h3>
              <p>
                Wait for approved eligibility criteria, required documents, and
                official university application links before submitting.
              </p>
            </li>
          </ol>
          <Action to="/projects">Browse studentships</Action>
        </div>
        <aside>
          <Globe2 size={30} />
          <h3>International applicants</h3>
          <p>
            We welcome your interest. Funding eligibility, overseas fees,
            English-language requirements, and visa guidance remain to be
            confirmed.
          </p>
          <hr />
          <h3>Programme enquiries</h3>
          <p>
            Contact the programme leadership through their official university
            profiles.
          </p>
          <a
            className="text-link"
            href="https://www.strath.ac.uk/staff/moshfeghiyashardr/"
          >
            Programme Director <ArrowUpRight size={16} />
          </a>
          <a
            className="text-link"
            href="https://www.gla.ac.uk/schools/psychologyneuroscience/staff/simonhanslmayr/"
          >
            Deputy Director <ArrowUpRight size={16} />
          </a>
        </aside>
      </section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Let’s connect.">
        Responsible Hybrid Intelligence at Strathclyde and Glasgow.
      </PageIntro>
      <section className="section container prose">
        <h2>Programme enquiries</h2>
        <p>
          A dedicated programme email address will be added once confirmed. In
          the meantime, contact the programme leadership through their official
          university pages.
        </p>
        <div className="directors">
          <article>
            <h3>Dr Yashar Moshfeghi</h3>
            <p>Programme Director · University of Strathclyde</p>
            <a
              className="text-link"
              href="https://www.strath.ac.uk/staff/moshfeghiyashardr/"
            >
              University profile <ArrowUpRight size={18} />
            </a>
          </article>
          <article>
            <h3>Professor Simon Hanslmayr</h3>
            <p>Deputy Director · University of Glasgow</p>
            <a
              className="text-link"
              href="https://www.gla.ac.uk/schools/psychologyneuroscience/staff/simonhanslmayr/"
            >
              University profile <ArrowUpRight size={18} />
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const titles = {
      "/": "Responsible Hybrid Intelligence",
      "/about": "About RHI",
      "/programme": "PhD Programme",
      "/themes": "Themes",
      "/masters": "Masters+",
      "/students": "Students",
      "/projects": "PhD Proposals",
      "/apply": "How to Apply",
      "/contact": "Contact",
    };
    const opportunity = projects.find((project) => location.pathname === `/projects/${project.id}`);
    const title = opportunity ? `RHI opportunity ${String(opportunity.id).padStart(2, "0")}` : titles[location.pathname];
    document.title = `${title || "Page not found"} | Leverhulme Doctoral Programme`;
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    else window.scrollTo(0, 0);
  }, [location]);
  const navigation = [
    ["/", "Home"],
    ["/themes", "Themes"],
    ["/about", "About"],
    ["/students", "Students"],
    ["/programme", "PhD Programmes"],
    ["/masters", "Masters + Programmes"],
    ["/projects", "Opportunities"],
  ];
  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main").focus();
      }}>
        Skip to main content
      </a>
      <div className="utility">
        <div className="container">
          <span>A LEVERHULME TRUST DOCTORAL PROGRAMME</span>
          <Link to="/contact">
            Get in touch <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link
            to="/"
            className="brand"
            aria-label="RHI home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              className="brand-logo"
              src={imagePath("Logo-Circle-2.webp")}
              alt=""
              width="72"
              height="72"
            />
            <span className="brand-name">
              Responsible
              <br />
              Hybrid Intelligence
            </span>
          </Link>
          <button
            className="mobile-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={menuOpen ? "open" : ""}
            aria-label="Main navigation"
          >
            {navigation.map(([to, name]) => (
              <NavLink key={to} to={to} end={to !== "/projects"} className={to === "/projects" ? "nav-apply" : undefined} onClick={() => setMenuOpen(false)}>
                {name}
                {to === "/projects" && <ArrowUpRight size={17} />}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/students" element={<Students />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Opportunity />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="section container">
                <h1>Page not found</h1>
                <Action to="/">Return home</Action>
              </section>
            }
          />
        </Routes>
      </main>
      {location.pathname !== "/" && <PartnershipSection />}
      <footer>
        <div className="container footer-main">
          <div>
            <Link to="/" className="brand footer-brand">
              <img
                className="brand-logo"
                src={imagePath("logo-circle.webp")}
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
              <span className="brand-name">
                Responsible
                <br />
                Hybrid Intelligence
              </span>
            </Link>
            <p>
              Human potential. Intelligent systems.
              <br />A responsible future, together.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/about">About the programme</Link>
            <Link to="/programme">PhD Programme</Link>
            <Link to="/themes">Research themes</Link>
            <Link to="/masters">Masters+</Link>
            <Link to="/students">Our students</Link>
          </div>
          <div className="footer-links">
            <Link to="/projects">PhD Proposals</Link>
            <Link to="/apply">How to Apply</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-cta">
            <span>YOUR NEXT CHAPTER</span>
            <Action to="/projects" light>
              Explore the opportunities
            </Action>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {copyrightYear} Responsible Hybrid Intelligence
          </span>
          <span>University of Strathclyde × University of Glasgow</span>
          <a href="https://www.strath.ac.uk/websiteprivacynotice/">
            University privacy notice <ArrowUpRight size={13} />
          </a>
          <a href="https://www.flickr.com/photos/giuseppemilo/16331067284/">Glasgow skyline: Giuseppe Milo</a>
          <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0 (display cropped)</a>
        </div>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <SiteRouter>
      <Site />
    </SiteRouter>
  );
}
