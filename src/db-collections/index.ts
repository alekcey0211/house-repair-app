import {
  createCollection,
  localStorageCollectionOptions,
  useLiveQuery,
} from '@tanstack/react-db'
import { z } from 'zod'

const dbKey = '1a96ee4b-f7ef-435b-a5d1-55f31dde56d6'

const AppStateSchema = z.object({
  id: z.string(),
  theme: z.enum(['light', 'dark', 'system']).optional().default('system'),
  building_type: z.enum(['flat', 'house']).optional(),
  building_repair_type: z.enum(['white_box', 'clean']).optional(),
  selected_task_id: z.string().optional(),
  todo_list: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        status: z.enum(['todo', 'in_progress', 'done']).optional(),
      }),
    )
    .optional(),
})

export type AppState = z.infer<typeof AppStateSchema>

export const appStateCollection = createCollection(
  localStorageCollectionOptions({
    id: 'app-state-1',
    storageKey: 'app-state',
    getKey: (item) => item.id,
    schema: AppStateSchema,
  }),
)

const initialState: AppState = {
  id: dbKey,
  theme: 'system',
}

type UpdateCallback = (state: Partial<AppState>) => void

export const changeAppState = (callback: UpdateCallback) => {
  const currentState = appStateCollection.get(dbKey)
  if (!currentState) {
    appStateCollection.insert(initialState)
  }
  appStateCollection.update(dbKey, callback)
}

export const getAppState = () => {
  return appStateCollection.get(dbKey) ?? initialState
}

export const resetAppState = () => {
  const currentState = appStateCollection.get(dbKey)
  appStateCollection.delete(dbKey)
  appStateCollection.insert({
    ...initialState,
    theme: currentState?.theme ?? initialState.theme,
  })
}

export const useLiveAppState = () => {
  const { data: appState } = useLiveQuery((q) => {
    return q.from({ appState: appStateCollection }).findOne()
  })
  return appState ?? initialState
}
