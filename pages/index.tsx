import { GetStaticProps } from 'next'
import { QueryClient, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { Auth } from '../components/Auth'
import { Layout } from '../components/Layout'
import { fetchNews } from '../hooks/useQueryNews'
import { News } from '../types/types'

export default function Home() {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<News[]>('news')

  return (
    <Layout title="Home">
      <p className="mb-5 text-xl text-blue-500">News list by SSG</p>
      {data?.map((news) => (
        <p className="font-bold" key={news.id}>
          {news.content}
        </p>
      ))}
      <Auth />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('news', fetchNews)

  return {
    props: {
      // pre-fetchした時にcacheからデータを取得し、jsonに吐き出す
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}
