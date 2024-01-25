import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav
      className='flex items-center justify-between p-4 container'
    >
      <h1>Turnos app</h1>
      <div
        className='flex gap-4'
      >
        <Button
          asChild
        >
          <Link
            href='/'
          >
            Sacar turno
          </Link>
        </Button>
        <Button
          asChild
        >
          <Link
            href='/turnos'
          >
            Lista de turnos
          </Link>
        </Button>
        <Button
          asChild
        >
          <Link
            href='/calendario'
          >
            Calendario
          </Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar