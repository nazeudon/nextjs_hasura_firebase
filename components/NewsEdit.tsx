import { VFC, memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAppMutate } from '../hooks/useAppMutate'
import { setEditedNews, selectNews } from '../slices/uiSlice'

const NewsEdit: VFC = () => {
  const dispatch = useDispatch()
  const editedNews = useSelector(selectNews)
  const { createNewsMutation, updateNewsMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNews.id === '') {
      createNewsMutation.mutate(editedNews.content)
    } else {
      updateNewsMutation.mutate(editedNews)
    }
  }

  if (createNewsMutation.error || updateNewsMutation.error) {
    return <div>Error!!</div>
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="px-3 py-2 mb-3 border border-gray-300"
          placeholder="new news ?"
          value={editedNews.content}
          onChange={(e) =>
            dispatch(setEditedNews({ ...editedNews, content: e.target.value }))
          }
        />
        <button
          className="px-3 py-2 mx-3 my-3 text-white bg-indigo-600 rounded disabled:opacity-40 hover:bg-indigo-700"
          disabled={!editedNews.content}
        >
          {editedNews.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const NewsEditMemo = memo(NewsEdit)
