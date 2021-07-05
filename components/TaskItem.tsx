import { VFC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { setEditedTask } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'
import { Task } from '../types/types'

interface Props {
  task: Task
}

const TaskItem: VFC<Props> = ({ task }) => {
  const dispatch = useDispatch()
  const { deleteTaskMutation } = useAppMutate()

  if (deleteTaskMutation.isLoading) {
    return <p>Deleting...</p>
  }

  if (deleteTaskMutation.error) {
    return <div>Error!!</div>
  }

  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="w-5 h-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: task.id,
                title: task.title,
              })
            )
          }}
        />
        <TrashIcon
          className="w-5 h-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(task.id)
          }}
        />
      </div>
    </li>
  )
}

export const TaskItemMemo = memo(TaskItem)
