import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import Cookie from 'universal-cookie'
import { Task } from '../types/types'
import { GET_TASKS } from '../queries/queries'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface TasksRes {
  tasks: Task[]
}

const fetchTasks = async () => {
  const { tasks: data } = await graphQLClient.request<TasksRes>(GET_TASKS)
  return data
}

export const useQueryTasks = () => {
  const token = cookie.get('token')

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [token])

  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: 0,
  })
}
