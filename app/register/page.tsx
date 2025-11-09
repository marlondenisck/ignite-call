'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryState } from 'nuqs'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

// Componente MultiStep simples
function MultiStep({
  size,
  currentStep,
}: {
  size: number
  currentStep: number
}) {
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: size }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i + 1 <= currentStep ? 'bg-gray-100' : 'bg-gray-600'
          }`}
        />
      ))}
      <span className='ml-2 text-xs text-gray-200'>
        Passo {currentStep} de {size}
      </span>
    </div>
  )
}

export default function Register() {
  const [username] = useQueryState('username') // Pega automaticamente da URL

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: username || '',
      name: '',
    },
  })

  async function handleRegister(data: RegisterFormData) {
    try {
      const response = await api.post('/users', {
        name: data.name,
        username: data.username,
      })
      console.log('Usuário criado:', response.data)
    } catch (err) {
      console.error('Erro ao criar usuário:', err)
      if (err instanceof Error) {
        console.error('Mensagem do erro:', err.message)
      }
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

        <MultiStep size={4} currentStep={1} />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='mt-6 flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-800 p-6'
      >
        <label className='flex flex-col gap-2'>
          <span className='text-sm text-gray-100'>Nome de usuário</span>
          <div className='flex items-center rounded-md border border-gray-600 bg-gray-900 focus-within:border-green-500'>
            <span className='px-3 text-sm text-gray-400'>ignite.com/</span>
            <input
              type='text'
              placeholder='seu-usuário'
              className='flex-1 bg-transparent px-3 py-3 text-white placeholder:text-gray-400 focus:outline-none'
              {...register('username')}
            />
          </div>
        </label>

        <label className='flex flex-col gap-2'>
          <span className='text-sm text-gray-100'>Nome completo</span>
          <input
            type='text'
            placeholder='Seu nome'
            className='rounded-md border border-gray-600 bg-gray-900 px-3 py-3 text-white placeholder:text-gray-400 focus:border-green-500 focus:outline-none'
            {...register('name')}
          />
        </label>
        {errors.username && (
          <span className='pl-1 text-sm text-red-500'>
            {errors.username.message}
          </span>
        )}
        {errors.name && (
          <span className='pl-1 text-sm text-red-500'>
            {errors.name.message}
          </span>
        )}

        <button
          type='submit'
          className='mt-4 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none'
          disabled={isSubmitting}
        >
          Próximo passo
          <ArrowRight size={16} />
        </button>
      </form>
    </main>
  )
}
