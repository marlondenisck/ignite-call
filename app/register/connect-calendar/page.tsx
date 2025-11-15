'use client'

import { signIn, useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

import { MultiStep } from '@/app/components/MultiStep'

export default function ConnectCalendar() {
  const session = useSession()
  console.log(session)
  // async function handleRegister() {

  // }

  return (
    <main className='mx-auto max-w-[572px] px-4 py-20'>
      {/* Header */}
      <div className='px-6'>
        <h1 className='text-2xl leading-6 font-bold text-white'>
          Conecte sua agenda!
        </h1>
        <p className='mb-6 text-gray-200'>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>

        <MultiStep size={4} currentStep={2} />
      </div>

      {/* Connect Box */}
      <div className='mt-6 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 p-6'>
        {/* Connect Item */}
        <div className='mb-2 flex items-center justify-between rounded-md border border-gray-600 px-6 py-4'>
          <span className='text-gray-100'>Google Calendar</span>
          <button
            type='button'
            className='group flex items-center gap-2 rounded-md border border-green-600 bg-transparent px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:border-green-300 hover:bg-green-700 hover:text-gray-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none'
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight
              size={16}
              className='text-green-600 transition-colors group-hover:text-white'
            />
          </button>
        </div>

        <button
          type='submit'
          className='mt-2 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none'
        >
          Próximo passo
          <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
