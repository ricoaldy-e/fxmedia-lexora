const footerLabels = ['FAQs', 'Advertising Rates', 'Terms of use', 'Privacy policy']

export default function Footer() {
  return (
    <footer className="site-footer bg-charcoal">
      <div className="footer-main flex flex-col items-center">
        <a className="footer-logo" href="#home" aria-label="Lexora home">
          <img src="/assets/lexora-logo.png" alt="Lexora Law Partners" />
        </a>
        <nav aria-label="Footer">
          <ul className="footer-links flex flex-wrap justify-center uppercase">
            {footerLabels.map(label => (
              <li key={label}><span aria-disabled="true" title="Destination unavailable">{label}</span></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer-bottom flex items-center justify-between">
        <p>© Copyright 2025 The Lexora of Singapore. All rights reserved</p>
        <p>Latest update 26 June 2025</p>
      </div>
    </footer>
  )
}
