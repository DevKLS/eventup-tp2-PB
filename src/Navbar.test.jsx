import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'

function Navbar() {
  return <h1>Home</h1>
}

test('renderiza menu de navegação', () => {
  render(<Navbar />)

  expect(screen.getByText('Home')).toBeTruthy()
})