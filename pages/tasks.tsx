import { VFC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronDoubleLeftIcon, LogoutIcon } from '@heroicons/react/solid'
import { useLogout } from '../hooks/useLogout'
import { Layout } from '../components/Layout'
import firebase from '../firebaseConfig'

const Tasks: VFC = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const user = firebase.auth().currentUser

  return (
    <Layout title="tasks">
      <p className="my-3">{user?.email}</p>
      <LogoutIcon
        className="w-5 h-5 my-3 text-blue-500 cursor-pointer"
        onClick={() => {
          logout()
          router.push('/')
        }}
      />
      <Link href="/" passHref>
        <div className="flex items-center mt-20 cursor-pointer">
          <ChevronDoubleLeftIcon className="w-5 h-5 mx-1 text-blue-500" />
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Tasks
