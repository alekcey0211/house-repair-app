import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export function App() {
  const [value, setValue] = useState('flat')

  return (
    <main className="grid grid-rows-[auto_1fr_auto] max-w-sm mx-auto">
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
        Планировщик ремонта
      </h1>
      <div className="grid place-content-center p-4">
        <RadioGroup
          value={value}
          onValueChange={setValue}
          className="grid gap-3 grid-cols-2"
        >
          <Label
            htmlFor="r1"
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-input/20 has-data-[state=checked]:shadow grid gap-3 rounded-lg border p-3"
          >
            <RadioGroupItem value="flat" id="r1" />
            <div className="grid gap-2">
              <span className="text-2xl font-semibold">Квартира</span>
              <span className="text-muted-foreground text-xs leading-snug text-balance">
                Выберите квартиру для планирования ремонта
              </span>
            </div>
          </Label>
          <Label
            htmlFor="r2"
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-input/20 has-data-[state=checked]:shadow grid gap-3 rounded-lg border p-3"
          >
            <RadioGroupItem value="house" id="r2" />
            <div className="grid gap-2">
              <span className="text-2xl font-semibold">Дом</span>
              <span className="text-muted-foreground text-xs leading-snug text-balance">
                Выберите дом для планирования ремонта
              </span>
            </div>
          </Label>
        </RadioGroup>
      </div>
      <div className="grid p-4">
        <Button size="lg" className="shadow text-xl">
          Продолжить
        </Button>
      </div>
    </main>
  )
}
