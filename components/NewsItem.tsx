import { VFC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { setEditedNews } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'
import { News } from '../types/types'

interface Props {
  news: News
}

const NewsItem: VFC<Props> = ({ news }) => {
  const dispatch = useDispatch()
  const { deleteNewsMutation } = useAppMutate()

  if (deleteNewsMutation.isLoading) {
    return <p>Deleting...</p>
  }

  if (deleteNewsMutation.error) {
    return <div>Error!!</div>
  }

  return (
    <li className="my-3">
      <span className="font-bold">{news.content}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="w-5 h-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(setEditedNews({ id: news.id, content: news.content }))
          }}
        />
        <TrashIcon
          className="w-5 h-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteNewsMutation.mutate(news.id)
          }}
        />
      </div>
    </li>
  )
}

export const NewsItemMemo = memo(NewsItem)
