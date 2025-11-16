'use client'

import { ArrowRight } from 'phosphor-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { MultiStep } from '@/app/components/MultiStep'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() {}

  return (
    <main className='mx-auto max-w-[572px] px-4 py-20'>
      {/* Header */}
      <div className='px-6'>
        <h1 className='text-2xl leading-6 font-bold text-white'>Quase lá</h1>
        <p className='mb-6 text-gray-200'>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </p>

        <MultiStep size={4} currentStep={3} />
      </div>

      {/* Form */}
      <form
        className='mt-6 flex flex-col gap-4 rounded-md bg-gray-800 p-6'
        onSubmit={handleSubmit(handleSetTimeIntervals)}
      >
        {/* Intervals Container */}
        {fields.map((field, index) => {
          return (
            <div
              className='mb-4 overflow-hidden rounded-md border border-gray-600'
              key={field.id}
            >
              {/* Interval Item - Segunda-feira */}
              <div className='flex items-center justify-between px-4 py-3'>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 rounded border-gray-600 bg-gray-900 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                  />
                  <span className='text-gray-100'>
                    {weekDays[field.weekDay]}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    type='time'
                    step={60}
                    className='h-10 w-auto rounded-md border border-gray-600 bg-gray-900 px-3 text-sm text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500 [&::-webkit-calendar-picker-indicator]:brightness-40 [&::-webkit-calendar-picker-indicator]:invert-100'
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <input
                    type='time'
                    step={60}
                    className='h-10 w-auto rounded-md border border-gray-600 bg-gray-900 px-3 text-sm text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500 [&::-webkit-calendar-picker-indicator]:brightness-40 [&::-webkit-calendar-picker-indicator]:invert-100'
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            </div>
          )
        })}

        {/* Submit Button */}
        <button
          type='submit'
          className='flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none'
        >
          Próximo passo
          <ArrowRight size={16} />
        </button>
      </form>
    </main>
  )
}
