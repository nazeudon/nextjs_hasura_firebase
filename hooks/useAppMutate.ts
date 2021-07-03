import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { resetEditedNews, resetEditedTask } from '../slices/uiSlice'
import {
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../queries/queries'
import { News, EditNews, Task, EditTask } from '../types/types'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const token = cookie.get('token')

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [token])

  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title: title }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData('tasks', [
            ...previousTodos,
            res.insert_tasks_one,
          ])
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  return {}
}
