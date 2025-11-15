import { Fragment, useState } from 'react'
import { ChevronRightIcon, SquareCheck, SquareIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'
import { ThemeProvider } from './theme-provider'
import { Footer } from './footer'
import { TaskAddForm } from './task-add-form'
import type { ReactNode } from 'react'
import type { AppState } from '@/db-collections'
import { Separator } from '@/components/ui/separator'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { changeAppState, useLiveAppState } from '@/db-collections'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="5726caaa-c76c-4e8d-961a-81e6d6e65acb-ui-theme"
    >
      <Header />
      <main className="grid grid-rows-[auto_1fr_auto] max-w-sm mx-auto">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export function App() {
  const appState = useLiveAppState()

  if (appState.building_repair_type) {
    return <Content />
  }

  if (appState.building_type) {
    return <SelectionBuildingRepairType />
  }

  return <SelectionBuildingType />
}

const SelectionBuildingType = () => {
  const [value, setValue] = useState<AppState['building_type']>('flat')

  return (
    <Page>
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
        Планировщик ремонта
      </h1>
      <div className="grid place-content-center p-4">
        <RadioGroup
          value={value}
          onValueChange={(newValue) =>
            setValue(newValue as AppState['building_type'])
          }
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
        <Button
          size="lg"
          className="shadow text-xl"
          onClick={() => {
            changeAppState((state) => {
              state.building_type = value
            })
          }}
        >
          Продолжить
        </Button>
      </div>
    </Page>
  )
}

const SelectionBuildingRepairType = () => {
  const appState = useLiveAppState()

  const [value, setValue] = useState<AppState['building_repair_type']>(
    appState.building_repair_type ?? 'white_box',
  )

  return (
    <Page>
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
        {`Круто! Теперь выберите тип ремонта для ${appState.building_type}`}
      </h1>
      <div className="grid place-content-center p-4">
        <RadioGroup
          value={value}
          onValueChange={(newValue) =>
            setValue(newValue as AppState['building_repair_type'])
          }
          className="grid gap-3 grid-cols-2"
        >
          <Label
            htmlFor="r1"
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-input/20 has-data-[state=checked]:shadow grid gap-3 rounded-lg border p-3"
          >
            <RadioGroupItem value="white_box" id="r1" />
            <div className="grid gap-2">
              <span className="text-2xl font-semibold">Белая коробка</span>
              <span className="text-muted-foreground text-xs leading-snug text-balance">
                Выберите белый ящик для планирования ремонта
              </span>
            </div>
          </Label>
          <Label
            htmlFor="r2"
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-input/20 has-data-[state=checked]:shadow grid gap-3 rounded-lg border p-3"
          >
            <RadioGroupItem value="clean" id="r2" />
            <div className="grid gap-2">
              <span className="text-2xl font-semibold">Чистовая отделка</span>
              <span className="text-muted-foreground text-xs leading-snug text-balance">
                Выберите чистовую отделку для планирования ремонта
              </span>
            </div>
          </Label>
        </RadioGroup>
      </div>
      <div className="grid p-4">
        <Button
          size="lg"
          className="shadow text-xl"
          onClick={() => {
            changeAppState((state) => {
              state.building_repair_type = value
            })
          }}
        >
          Продолжить
        </Button>
      </div>
    </Page>
  )
}

const Content = () => {
  const appState = useLiveAppState()

  return (
    <Page>
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
        Планировщик ремонта
      </h1>
      <ItemGroup className="py-4">
        {appState.todo_list?.map((task, index, array) => (
          <Fragment key={task.id}>
            <Item
              variant="default"
              size="sm"
              onClick={() => {
                changeAppState((state) => {
                  state.selected_task_id = task.id
                })
              }}
            >
              <ItemMedia>
                {task.status === 'done' ? (
                  <SquareCheck className="size-5" />
                ) : (
                  <SquareIcon className="size-5" />
                )}
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-lg">{task.title}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Item>
            {index !== array.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ItemGroup>
      <div className="grid p-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="lg" className="shadow text-xl">
              Добавить задачу
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Добавить задачу</DrawerTitle>
              <DrawerDescription>
                Добавьте задачу для планирования ремонта
              </DrawerDescription>
            </DrawerHeader>
            <TaskAddForm
              onSubmit={(values) => {
                changeAppState((state) => {
                  state.todo_list = [
                    ...(state.todo_list ?? []),
                    {
                      id: uuidv4(),
                      title: values.title,
                      description: values.description,
                      status: 'todo',
                    },
                  ]
                })
              }}
              className="p-4"
            />
          </DrawerContent>
        </Drawer>
      </div>
    </Page>
  )
}
