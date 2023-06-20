import React, { useState, useEffect } from 'react'
import Results from './Results'

function Game ({ selected, enemy, characters }) {
  const [playerLives, setPlayerLives] = useState(3)
  const [enemyLives, setEnemyLives] = useState(3)
  const [draw, setDraw] = useState('')

  const [attack, setAttack] = useState(null)
  const [playerAttack, setPlayerAttack] = useState(null)
  console.log('Player: ', playerAttack)
  console.log('Enemy: ', attack)

  const players = characters.filter(
    (character) => character.name === enemy || character.name === selected
  )
  const player = players.find((player) => player.name === selected)
  const adversary = players.find((player) => player.name === enemy)

  useEffect(() => {
    if (playerAttack === null) return
    if (playerLives <= 0 || enemyLives <= 0) return

    const randomNumber = Math.floor(Math.random() * 3)
    let adversaryAttack

    if (randomNumber === 0) {
      adversaryAttack = '🔥'
    } else if (randomNumber === 1) {
      adversaryAttack = '🍀'
    } else if (randomNumber === 2) {
      adversaryAttack = '💧'
    }

    setAttack(adversaryAttack)

    if (
      (playerAttack === '🔥' && adversaryAttack === '🍀') ||
      (playerAttack === '🍀' && adversaryAttack === '💧') ||
      (playerAttack === '💧' && adversaryAttack === '🔥')
    ) {
      setEnemyLives((current) => current - 1)
      return setDraw('GANASTE')
    } else if (
      (adversaryAttack === '🔥' && playerAttack === '🍀') ||
      (adversaryAttack === '🍀' && playerAttack === '💧') ||
      (adversaryAttack === '💧' && playerAttack === '🔥')
    ) {
      setPlayerLives((current) => current - 1)
      return setDraw('PERDISTE')
    } else if (playerAttack === adversaryAttack) {
      return setDraw('EMPATE')
    }
  }, [playerAttack])

  const handleClick = (e) => {
    if (playerLives <= 0 || enemyLives <= 0) return
    const newAttack = e.target.textContent
    setPlayerAttack(newAttack)
  }

  return (
    <>
      <div className='w-full flex'>
        <div className='flex-1'>
          <h3 className='text-center'>{selected}</h3>
          <img src={player.img} alt={player.name} />
          <p className='text-center'>{playerLives}</p>
          <p className='text-center'>{playerAttack}</p>
        </div>
        <div className='flex-1'>
          <h3 className='text-center'>{enemy}</h3>
          <img src={adversary.img} alt={adversary.name} />
          <p className='text-center'>{enemyLives}</p>
          <p className='text-center'>{attack}</p>
        </div>
      </div>
      {draw !== '' ? (<p>{draw}</p>) : ''}
      <div className='flex items-center justify-center gap-4'>
        <div>
          <button onClick={handleClick} className='px-6 py-4 bg-slate-400 rounded'>🔥</button>
        </div>
        <div>
          <button onClick={handleClick} className='px-6 py-4 bg-slate-400 rounded'>🍀</button>
        </div>
        <div>
          <button onClick={handleClick} className='px-6 py-4 bg-slate-400 rounded'>💧</button>
        </div>
      </div>
      <Results playerlives={playerLives} enemylives={enemyLives} />
    </>
  )
}

export default Game
