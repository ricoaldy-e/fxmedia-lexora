import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Services from './components/Services'
import Anniversary from './components/Anniversary'
import News from './components/News'

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
        <News />
      </main>
    </>
  )
}

export default App
