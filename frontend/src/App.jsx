// frontend/src/App.jsx
import React, { useEffect, useState } from 'react'
import { Play, Settings, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'https://nim-ai-game-4.onrender.com/
'

function Pile({ index, count, onSelect, selected }){
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      className={`pile ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(index, count)}
      role="button"
      aria-label={`Pile ${index}, ${count} items`}
    >
      <div className="pile-count">{count}</div>
      <div className="pile-items">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="dot" />
        ))}
      </div>
    </motion.div>
  )
}

export default function App(){
  const [gameId, setGameId] = useState(null)
  const [piles, setPiles] = useState([1,3,5,7])
  const [player, setPlayer] = useState(0)
  const [selected, setSelected] = useState({ pile: null, count: 1 })
  const [log, setLog] = useState([])
  const [humanPlayer, setHumanPlayer] = useState(0)
  const [theme, setTheme] = useState('dark')

  useEffect(()=>{ startGame() }, [])

  function addLog(text){
    setLog(l => [text, ...l].slice(0, 30))
  }

  async function startGame(){
    const res = await fetch(`${API}/start`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ initial: [1,3,5,7], human_first: true })
    })
    const data = await res.json()
    if (!data.game_id) return addLog('Failed to start game')
    setGameId(data.game_id)
    setPiles(data.piles)
    setPlayer(data.player)
    setSelected({ pile: null, count: 1 })
    setLog([])
    addLog('New game started')
  }

  function onSelectPile(i){
    setSelected({ pile: i, count: 1 })
  }

  async function makeMove(){
    if (selected.pile === null) return addLog('Select a pile first')
    const action = [selected.pile, selected.count]
    const res = await fetch(`${API}/move/${gameId}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ action })
    })
    const data = await res.json()
    if (data.error) return addLog(`Invalid move: ${data.error}`)
    setPiles(data.piles)
    setPlayer(data.player)
    addLog(`You removed ${action[1]} from pile ${action[0]}`)
    // If game continues, ask AI to move
    if (!data.winner){
      const r = await fetch(`${API}/ai_move/${gameId}`, { method: 'POST' })
      const aiData = await r.json()
      if (aiData.error) return addLog(`AI error: ${aiData.error}`)
      setPiles(aiData.piles)
      setPlayer(aiData.player)
      addLog(`AI removed ${aiData.action[1]} from pile ${aiData.action[0]}`)
      if (aiData.winner) addLog(`Winner: ${aiData.winner}`)
    } else {
      addLog('You won!')
    }
  }

  return (
    <div className={`app ${theme}`}>
      <header className="topbar">
        <div className="title">
          <h1>Nim — Wayne Omanyo</h1>
          <p className="subtitle">AI vs Human — Web Edition</p>
        </div>
        <div className="controls">
          <button className="btn" onClick={startGame}><Play size={16}/> Start</button>
          <button className="btn" onClick={()=>setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>} Theme
          </button>
        </div>
      </header>

      <main className="board">
        <aside className="hud">
          <div className="card">
            <h3>HUD</h3>
            <p><strong>Turn:</strong> {player === humanPlayer ? 'Human' : 'AI'}</p>
            <p><strong>Piles:</strong> {piles.join(', ')}</p>
            <div className="bars">
              <div className="bar"><div className="fill" style={{width:'70%'}}>Health</div></div>
              <div className="bar"><div className="fill" style={{width:'45%'}}>Stamina</div></div>
              <div className="bar"><div className="fill" style={{width:'30%'}}>Mana</div></div>
            </div>
          </div>

          <div className="card log">
            <h3>Activity Log</h3>
            <ul>
              {log.map((l,i)=>(<li key={i}>{l}</li>))}
            </ul>
          </div>
        </aside>

        <section className="play-area">
          <div className="piles">
            {piles.map((c,i)=>(
              <Pile key={i} index={i} count={c} onSelect={onSelectPile} selected={selected.pile===i} />
            ))}
          </div>

          <div className="controls-area">
            <label>Remove count</label>
            <input type="number" min="1" max={selected.pile !== null ? piles[selected.pile] : 7}
                   value={selected.count}
                   onChange={(e)=>setSelected(s => ({...s, count: Math.max(1, Math.min(Number(e.target.value)||1, piles[s.pile]||1))}))} />
            <button className="btn primary" onClick={makeMove}>Make Move</button>
          </div>
        </section>
      </main>

      <footer className="footer">Made with ❤️ — Nim Web App</footer>
    </div>
  )
}
