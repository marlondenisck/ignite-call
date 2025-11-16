'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'phosphor-react'
import { useEffect } from 'react'

import { MultiStep } from '@/app/components/MultiStep'

export default function ConnectCalendar() {
  const session = useSession()
  console.log('Session status:', session)
  const searchParams = useSearchParams()
  const router = useRouter()

  const hasAuthError = !!searchParams.get('error')
  const isSignedIn = session.status === 'authenticated'

  // Remove o erro da URL quando o usuário se conectar com sucesso
  useEffect(() => {
    if (isSignedIn && hasAuthError) {
      router.replace('/register/connect-calendar')
    }
  }, [isSignedIn, hasAuthError, router])

  async function handleConnectCalendar() {
    await signIn('google')
  }

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

      <div className='mt-6 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 p-6'>
        <div className='mb-2 flex items-center justify-between rounded-md border border-gray-600 px-6 py-4'>
          <span className='text-gray-100'>Google Calendar</span>

          {isSignedIn ? (
            <button
              type='button'
              disabled
              className='flex cursor-not-allowed items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400'
            >
              Conectado
              <Check size={16} />
            </button>
          ) : (
            <button
              type='button'
              className='group flex items-center gap-2 rounded-md border border-green-600 bg-transparent px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:border-green-300 hover:bg-green-700 hover:text-gray-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-900 focus:outline-none'
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight
                size={16}
                className='text-green-600 transition-colors group-hover:text-gray-100'
              />
            </button>
          )}
        </div>

        {hasAuthError && (
          <div className='mb-4 rounded-md border border-red-900 bg-red-900/10 px-4 py-3 text-sm text-red-400'>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </div>
        )}

        <button
          type='submit'
          disabled={!isSignedIn}
          className='mt-2 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Próximo passo
          <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
