import capiimg from '../assets/mokepons_mokepon_capipepo_attack.png'
import hipoimg from '../assets/mokepons_mokepon_hipodoge_attack.png'
import ratiimg from '../assets/mokepons_mokepon_ratigueya_attack.png'

export function CharactersObjects () {
  class Character {
    constructor ({ name, img }) {
      this.name = name
      this.img = img
    }
  }

  const capipepo = new Character({ name: 'Capipepo', img: capiimg })
  const hipodoge = new Character({ name: 'Hipodoge', img: hipoimg })
  const ratigueya = new Character({ name: 'Ratigueya', img: ratiimg })

  const characters = [capipepo, hipodoge, ratigueya]

  return characters
}
