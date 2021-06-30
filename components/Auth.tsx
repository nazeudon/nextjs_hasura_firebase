import { VFC } from 'react'
import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import firebase from '../firebaseConfig'

export const Auth: VFC = () => {
  const user = firebase.auth().currentUser
  const {
    email,
    password,
    emailChange,
    pwChange,
    isLogin,
    toggleMode,
    authUser,
  } = useFirebaseAuth()

  return (
    <>
      <form
        onSubmit={authUser}
        className="flex flex-col items-center justify-center mt-8"
      >
        <label>Email:</label>
        <input
          type="text"
          className="px-3 py-1 my-3 border border-gray-300"
          placeholder="email ?"
          value={email}
          onChange={emailChange}
        />
        <label>Password:</label>
        <input
          type="text"
          className="px-3 py-1 my-3 border border-gray-300"
          placeholder="password ?"
          value={password}
          onChange={pwChange}
        />
        <button
          type="submit"
          disabled={!email || !password}
          className="px-3 py-1 mt-5 text-white bg-indigo-600 rounded disabled:opacity-40 hover:bg-indigo-700 focus:outline-none"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <SwitchVerticalIcon
        className="w-5 h-5 my-5 text-blue-500 cursor-pointer"
        onClick={toggleMode}
      />
      {user && (
        <Link href="/tasks" passHref>
          <div className="flex items-center my-3 cursor-pointer">
            <ChevronDoubleRightIcon className="w-5 h-5 mx-1 text-blue-500" />
            <span>To tasks page</span>
          </div>
        </Link>
      )}
    </>
  )
}
