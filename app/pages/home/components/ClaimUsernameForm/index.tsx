'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})
// z.object() → Cria um "molde" que define como os dados devem ser
// username: z.string() → Diz que o campo username deve ser um texto (string)

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>
// type → Cria um "tipo" personalizado no TypeScript
// z.infer<> → "Descobre" automaticamente qual é o formato dos dados baseado no schema
// Resultado: ClaimUsernameFormData = { username: string }

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })
  //   O resolver é como um "tradutor" entre o React Hook Form e bibliotecas de validação
  // Ele pega as regras do Zod e "ensina" o React Hook Form como usar essas regras

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClaimUsername)}
        className='mt-4 grid grid-cols-[1fr_auto] gap-2 rounded-md border border-gray-600 bg-gray-800 p-4 max-sm:grid-cols-1'
      >
        <div className='relative'>
          <span className='absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400'>
            ignite.com/
          </span>
          <input
            type='text'
            placeholder='seu-usuário'
            {...register('username')}
            className='w-full rounded border border-gray-600 bg-gray-900 py-2 pr-3 pl-[90px] text-sm text-gray-100 placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none'
          />
        </div>

        <button
          type='submit'
          className='flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Reservar
          <ArrowRight size={16} />
        </button>
      </form>
      <div className='mt-2'>
        <span className='text-xs text-gray-400'>
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </span>
      </div>
    </>
  )
}
