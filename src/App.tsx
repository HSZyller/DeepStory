import React, { useMemo, useState } from 'react'
import './App.css'
import CharacterSheet from './DeepCharacterSheet'
import DeepStory from './deep-stories-app'

interface ApplicationSection {
  id: string
  name: string
  description: string
  component: React.ReactNode
}

function App() {
  const applications: ApplicationSection[] = useMemo(
    () => [
      {
        id: 'character-sheet',
        name: 'Deep Character Sheet',
        description: 'Character Sheet tracker',
        component: <CharacterSheet />,
      },
      {
        id: 'deep-story',
        name: 'Deep Story',
        description: 'Story and Dialog Aid',
        component: <DeepStory />,
      },
    ],
    []
  )

  const [activeAppId, setActiveAppId] = useState(applications[0].id)
  const activeApp =
    applications.find((app) => app.id === activeAppId) ?? applications[0]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Deep Story Tools</h1>
          <p className="app-subtitle">
            Switch between your creative companions or add more as you build new
            experiences.
          </p>
        </div>
        <div className="app-switcher" role="tablist" aria-label="Application selector">
          {applications.map((app) => {
            const isActive = app.id === activeAppId
            return (
              <button
                key={app.id}
                className={`switcher-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveAppId(app.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${app.id}`}
              >
                <span className="tab-name">{app.name}</span>
                <span className="tab-description">{app.description}</span>
              </button>
            )
          })}
        </div>
      </header>

      <main
        id={`panel-${activeApp.id}`}
        className="app-content"
        role="tabpanel"
        aria-label={activeApp.name}
      >
        {activeApp.component}
      </main>
    </div>
  )
}

export default App
