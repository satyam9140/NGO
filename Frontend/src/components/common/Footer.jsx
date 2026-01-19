import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer" role="contentinfo">
      <div>© {new Date().getFullYear()} HelpingHands</div>
      <div style={{opacity:.9}}>
        Built with <span style={{color:'#f97316'}}>❤️</span> · <a href="/about" style={{color:'inherit', textDecoration:'underline'}}>About</a>
      </div>
    </footer>
  )
}