'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { MultiStep } from '@/app/components/MultiStep'
import { api } from '@/lib/axios'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()

  console.log(session)

  async function handleUpdateProfile(data: UpdateProfileData) {
    try {
      await api.put('/users/profile', {
        bio: data.bio,
      })

      await router.push(`/schedule/${session.data?.user?.username}`)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      alert('Erro ao atualizar perfil. Verifique o console.')
    }
  }

  return (
    <main className='mx-auto max-w-[572px] px-4 py-20'>
      {/* Header */}
      <div className='px-6'>
        <h1 className='text-2xl leading-6 font-bold text-white'>
          Bem-vindo ao Ignite Call!
        </h1>
        <p className='mb-6 text-gray-200'>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>

        <MultiStep size={4} currentStep={4} />
      </div>

      {/* Form */}
      <form
        className='mt-6 flex flex-col gap-4 rounded-md bg-gray-800 p-6'
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <label className='flex flex-col gap-2'>
          <span className='text-sm text-gray-100'>Foto de perfil</span>
          <div className='flex items-center gap-4'>
            {session.data?.user?.avatar_url && (
              <Image
                src={session.data.user.avatar_url}
                alt={session.data.user.name || ''}
                referrerPolicy='no-referrer'
                width={64}
                height={64}
                className='h-16 w-16 rounded-full'
              />
            )}
            <span className='text-sm text-gray-400'>
              {session.data?.user?.name}
            </span>
          </div>
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-sm text-gray-100'>Sobre você</span>
          <textarea
            {...register('bio')}
            className='min-h-[120px] resize-y rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-sm text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
          <span className='text-sm text-gray-200'>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </span>
        </label>

        <button
          type='submit'
          disabled={isSubmitting}
          className='flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Finalizar
          <ArrowRight size={16} />
        </button>
      </form>
    </main>
  )
}
