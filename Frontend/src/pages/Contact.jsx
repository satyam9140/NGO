import React, { useState } from 'react'

export default function Contact() {
  const [message, setMessage] = useState('')
  const submit = (e) => { e.preventDefault(); alert('Thanks for contacting us!') }
  return (
    <div className="card">
      <h2>Contact</h2>
      <form onSubmit={submit}>
        <label>Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
        <button className="btn">Send</button>
      </form>
    </div>
  )
}