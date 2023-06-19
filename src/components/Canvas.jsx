import React, { useEffect, useRef, useState } from 'react'
import { CharactersObjects } from '../utils/Characters'

function Canvas ({ selected }) {
  const canvasRef = useRef()
  const characters = CharactersObjects()
  const [position, setPosition] = useState({ x: 10, y: 10 })
  const filterCharactersPositionRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const collidedCharacters = []

    const handleKey = (e) => {
      const { key } = e
      const { x, y } = position

      switch (key) {
        case 'ArrowRight':
          setPosition({ x: x + 10, y })
          break
        case 'ArrowLeft':
          setPosition({ x: x - 10, y })
          break
        case 'ArrowDown':
          setPosition({ x, y: y + 10 })
          break
        case 'ArrowUp':
          setPosition({ x, y: y - 10 })
          break
        default:
          break
      }
    }

    if (selected === null) return
    const selectedCharacter = characters.find((character) => character.name === selected)

    const displayCharacters = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar personaje seleccionado
      const characterName = new Image()
      characterName.src = selectedCharacter.img
      context.drawImage(characterName, position.x, position.y, 50, 50)

      // Dibujar otros personajes
      filterCharactersPositionRef.current.forEach((e) => {
        const characterExceptName = new Image()
        characterExceptName.src = e.img
        context.drawImage(characterExceptName, e.x, e.y, 50, 50)

        if (
          position.x < e.x + 50 &&
          position.x + 50 > e.x &&
          position.y < e.y + 50 &&
          position.y + 50 > e.y &&
          !collidedCharacters.includes(e.name) // Verificar si no se ha detectado colisión previamente
        ) {
          console.log(`Colisión con ${e.name}`)
          collidedCharacters.push(e.name) // Agregar el nombre del personaje a los que ya han colisionado
          // Realizar las acciones que desees cuando haya una colisión
        }
      })

      requestAnimationFrame(displayCharacters)
    }

    requestAnimationFrame(displayCharacters)

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [selected, position, characters])

  useEffect(() => {
    if (selected === null) return
    const canvas = canvasRef.current

    const randomPosition = () => {
      return Math.floor(Math.random() * canvas.height)
    }

    const filterCharacters = characters.filter((character) => character.name !== selected)
    const updatedFilterCharactersPosition = filterCharacters.map((character) => {
      const existingCharacter = filterCharactersPositionRef.current.find((c) => c.name === character.name)

      if (existingCharacter) {
        return { ...existingCharacter }
      }
      return {
        name: character.name,
        img: character.img,
        x: randomPosition(),
        y: randomPosition()
      }
    })

    filterCharactersPositionRef.current = updatedFilterCharactersPosition
  }, [selected])

  return (
    <canvas ref={canvasRef} width={400} height={400} className='bg-slate-400'>
      {/* `Your browser does not support the canvas element.` */}
    </canvas>
  )
}

export default Canvas
