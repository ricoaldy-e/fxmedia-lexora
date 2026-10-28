import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Services from './components/Services'
import Anniversary from './components/Anniversary'
import News from './components/News'
import RoadTo2027 from './components/RoadTo2027'
import LegalSupport from './components/LegalSupport'
import CareerSupport from './components/CareerSupport'
import Footer from './components/Footer'
import './components/HomepageSections.css'

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
        <RoadTo2027 />
        <LegalSupport />
        <div className="press-region"><News /></div>
        <CareerSupport />
      </main>
      <Footer />
    </>
  )
}

export default App
