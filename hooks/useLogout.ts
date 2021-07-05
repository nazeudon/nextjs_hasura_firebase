import Cookie from 'universal-cookie'
import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import { resetEditedTask, resetEditedNews } from '../slices/uiSlice'
import firebase from '../firebaseConfig'
import { unSubMeta } from './useUserChanged'

const cookie = new Cookie()

export const useLogout = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const logout = async () => {
    if (unSubMeta) {
      unSubMeta()
    }
    dispatch(resetEditedTask())
    dispatch(resetEditedNews())
    await firebase.auth().signOut()
    queryClient.removeQueries('tasks')
    queryClient.removeQueries('news')
    cookie.remove('token')
  }

  return { logout }
}
