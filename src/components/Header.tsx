import { Trash2 } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { resetAppState } from '@/db-collections'

export default function Header() {
  return (
    <header className="p-2 flex items-center justify-end gap-2">
      <Button variant="outline" size="icon" onClick={() => resetAppState()}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <ModeToggle />
    </header>
  )
}
