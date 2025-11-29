import Image from 'next/image'
import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { ScheduleForm } from './components/ScheduleForm'

interface ScheduleProps {
  params: Promise<{
    username: string
  }>
}

export default async function Schedule({ params }: ScheduleProps) {
  const { username } = await params

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <main className='mx-auto max-w-4xl px-4 py-20'>
      <header className='mb-4 flex flex-col items-center'>
        {user.avatar_url && (
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={80}
            height={80}
            className='mb-2 h-20 w-20 rounded-full'
          />
        )}
        <h1 className='mt-2 text-2xl leading-6 font-bold text-white'>
          {user.name}
        </h1>
        {user.bio && <p className='text-gray-200'>{user.bio}</p>}
      </header>
      <ScheduleForm />
    </main>
  )
}
