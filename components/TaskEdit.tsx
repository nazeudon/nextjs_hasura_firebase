import { VFC, memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedTask, selectTask } from '../slices/uiSlice'

const TaskEdit: VFC = () => {
  const dispatch = useDispatch()
  const editedTask = useSelector(selectTask)
  const { createTaskMutation, updateTaskMutation } = useAppMutate()

  const submitHanler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '') {
      createTaskMutation.mutate(editedTask.title)
    } else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  if (createTaskMutation.error || updateTaskMutation.error) {
    return <div>Error!!</div>
  }

  return (
    <div>
      <form onSubmit={submitHanler}>
        <input
          type="text"
          className="px-3 py-2 mb-3 border border-gray-300"
          placeholder="new task ?"
          value={editedTask.title}
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
        />
        <button
          className="px-3 py-2 mx-3 my-3 text-white bg-indigo-600 rounded disabled:opacity-40 hover:bg-indigo-700"
          disabled={!editedTask.title}
        >
          {editedTask.id === '' ? 'Create' : 'update'}
        </button>
      </form>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
