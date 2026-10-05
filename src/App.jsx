import { useCallback, useState } from 'react'
import Announcement from './components/Announcement'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Elements from './components/Elements'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Method from './components/Method'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Specimen from './components/Specimen'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const goToWork = useCallback(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const resetFilters = useCallback(() => {
    setQuery('')
    setCategory('all')
  }, [])

  return (
    <>
      <Cursor />
      <Announcement />
      <Navbar />
      <main>
        <Hero query={query} onQuery={setQuery} category={category} onCategory={setCategory} onSubmit={goToWork} />
        <Specimen />
        <Projects query={query} category={category} onReset={resetFilters} />
        <Method />
        <Elements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
