'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

const FormError = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className={'text-sm text-red-500'}>
      {children}
    </span>
  )
}

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleConfirmScheduling)}
      className='max-w-[540px] mx-auto mt-6 flex flex-col gap-4'
    >
      <div className='flex items-center gap-4 pb-6 mb-2 border-b border-gray-600'>
        <span className='flex items-center gap-2 text-gray-300'>
          <CalendarBlank className='text-gray-200 w-5 h-5' />
          22 de Setembro de 2022
        </span>
        <span className='flex items-center gap-2 text-gray-300'>
          <Clock className='text-gray-200 w-5 h-5' />
          18:00h
        </span>
      </div>

      <label className='flex flex-col gap-2'>
        <span className='text-sm text-gray-200'>Nome completo</span>
        <input 
          type='text'
          placeholder='Seu nome'
          {...register('name')}
          className='px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label className='flex flex-col gap-2'>
        <span className='text-sm text-gray-200'>Endereço de e-mail</span>
        <input 
          type='email'
          placeholder='johndoe@example.com'
          {...register('email')}
          className='px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
        />
         {errors.email && (
          <FormError>{errors.email.message}</FormError>
        )}
      </label>

      <label className='flex flex-col gap-2'>
        <span className='text-sm text-gray-200'>Observações</span>
        <textarea 
          rows={4}
          {...register('observations')}
          className='px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y min-h-20'
        />
       
      </label>

      <div className='flex justify-end gap-2 mt-2'>
        <button 
          type='button'
          className='px-6 py-3 border border-gray-600 text-gray-200 rounded-md hover:bg-gray-800 transition-colors'
        >
          Cancelar
        </button>
        <button 
          type='submit' disabled={isSubmitting}
          className='px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
        >
          Confirmar
        </button>
      </div>
    </form>
  )
}