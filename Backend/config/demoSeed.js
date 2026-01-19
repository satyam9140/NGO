// Demo seed data used when DB has no approved NGOs.
// Keep small, only for development / demo UI.
module.exports = [
  {
    _id: 'seed1',
    name: 'Care for All',
    mission: 'Provide basic needs to underserved communities.',
    description: 'Care for All delivers food, education and basic healthcare services to vulnerable populations across regions.',
    contactEmail: 'contact@careforall.org',
    approved: true,
    attachments: ['https://images.unsplash.com/photo-1545125850-1c3b5b7d1f0f?q=80&w=1200&auto=format&fit=crop&crop=faces']
  },
  {
    _id: 'seed2',
    name: 'GreenFuture',
    mission: 'Environmental education and tree planting drives.',
    description: 'GreenFuture runs community tree-planting programs, environmental education for schools and neighbourhood cleanups.',
    contactEmail: 'hello@greenfuture.org',
    approved: true,
    attachments: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop&crop=faces']
  }
]