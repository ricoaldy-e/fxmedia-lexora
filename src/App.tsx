import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Services from './components/Services'
import Anniversary from './components/Anniversary'

function App() {
  return (
    <>
      <a className="skip-link" href="#what-we-do">
        Skip to content
      </a>
      <main>
        <Hero />
        <Introduction />
        <Services />
        <Anniversary />
      </main>
    </>
  )
}

export default App
