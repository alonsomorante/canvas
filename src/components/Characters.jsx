import React, { useState } from 'react'
import { CharactersObjects } from '../utils/Characters'
import Canvas from './Canvas'

function Characters () {
  const [selected, setSelected] = useState(null)
  const [showSelected, setShowSelected] = useState(null)
  console.log(showSelected)

  const handleClick = ({ characterName }) => {
    setSelected(characterName)
  }

  return (
    <>
      <section className='w-full'>
        <h1 className='text-3xl text-center'>Bichos Game</h1>
        <ul className='mt-12 flex flex-col gap-12'>
          {
         CharactersObjects().map(character =>
           (
             <li key={character.name} className='flex flex-col gap-2 items-center' onClick={() => handleClick({ characterName: character.name })}>
               <h3 className='text-xl'>{character.name}</h3>
               <img src={character.img} alt={character.name} className='w-52' />
             </li>
           )
         )
        }
        </ul>
        <button onClick={() => setShowSelected(selected)} className='bg-orange-200 px-10 py-4 text-center font-bold rounded-md hover:bg-orange-300'>Preciona</button>
        {showSelected && <p>You select {showSelected} as your character</p>}
      </section>
      <Canvas selected={showSelected} />
    </>
  )
}

export default Characters
