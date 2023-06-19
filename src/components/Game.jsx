import React from 'react'

function Game ({ selected, enemy, characters }) {
  const players = characters.filter(character => character.name === enemy || character.name === selected)
  const player = players.find(player => player.name === selected)
  const adversary = players.find(player => player.name === enemy)
  return (
    <>

      <div className='w-full flex'>
        <div className='flex-1'>
          <h3 className='text-center'>{selected}</h3>
          <img src={player.img} alt={player.name} />
        </div>
        <div className='flex-1'>
          <h3 className='text-center'>{enemy}</h3>
          <img src={adversary.img} alt={adversary.name} />
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <div>
          <button className='px-6 py-4 bg-slate-400 rounded'>Poderes</button>
        </div>
        <div>
          <button className='px-6 py-4 bg-slate-400 rounded'>Poderes</button>
        </div>
        <div>
          <button className='px-6 py-4 bg-slate-400 rounded'>Poderes</button>
        </div>
      </div>
    </>
  )
}

export default Game
