import { usePortfolio } from './hooks/usePortfolio'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { data, error, loading } = usePortfolio()

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center" role="status">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent" />
        <span className="sr-only">Loading portfolio…</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <p>Sorry, the portfolio couldn't load right now. Please try again in a moment.</p>
      </div>
    )
  }

  const { profile } = data

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar profile={profile} />
      <main id="main">
        <Hero profile={profile} highlights={data.highlights} />
        <About profile={profile} highlights={data.highlights} interests={data.interests} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} otherWork={data.otherWork} />
        <Projects projects={data.projects} />
        <Education education={data.education} />
        <Certifications certifications={data.certifications} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  )
}
