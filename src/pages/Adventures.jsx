import './pages.css'

function Adventures() {
  const adventures = [
    {
      id: 1,
      title: 'Adventure Title 1',
      description: 'Replace with your adventure descriptions',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Adventure Title 2',
      description: 'Add more adventures from your Wix site',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Adventure Title 3',
      description: 'These are template placeholders',
      status: 'Completed'
    }
  ]

  return (
    <div className="page adventures-page">
      <h1>Adventures & Campaigns</h1>
      <p>Explore the epic quests across the multiverse</p>

      <div className="adventures-grid">
        {adventures.map(adventure => (
          <div key={adventure.id} className="adventure-card">
            <h2>{adventure.title}</h2>
            <p>{adventure.description}</p>
            <span className={`status ${adventure.status.toLowerCase()}`}>
              {adventure.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Adventures
