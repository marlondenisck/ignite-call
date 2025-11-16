'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { MultiStep } from '@/app/components/MultiStep'
import { getWeekDays } from '@/utils/get-week-days'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .refine((intervals) => intervals.some((interval) => interval.enabled), {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => intervals.filter((interval) => interval.enabled)),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data)
  }

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
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <input
                          type='checkbox'
                          onChange={(e) =>
                            field.onChange(e.target.checked === true)
                          }
                          checked={field.value}
                          className='h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-600 bg-gray-900 checked:border-green-600 checked:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                        />
                      )
                    }}
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
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <input
                    type='time'
                    step={60}
                    className='h-10 w-auto rounded-md border border-gray-600 bg-gray-900 px-3 text-sm text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500 [&::-webkit-calendar-picker-indicator]:brightness-40 [&::-webkit-calendar-picker-indicator]:invert-100'
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            </div>
          )
        })}

        {errors.intervals && (
          <p className='mb-4 text-sm text-red-400'>
            {errors.intervals.root?.message || errors.intervals.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          Próximo passo
          <ArrowRight size={16} />
        </button>
      </form>
    </main>
  )
}
