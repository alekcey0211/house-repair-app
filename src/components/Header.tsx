import { ModeToggle } from './mode-toggle'

export default function Header() {
  return (
    <header className="p-2 flex items-center justify-end">
      <ModeToggle />
    </header>
  )
}
