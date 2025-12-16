'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Calendar } from '@/app/components/Calendar'
import {api} from '@/lib/axios'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const params = useParams()

  const isDateSelected = !!selectedDate
  const username = String(params.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })


  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }


  return (
    <div 
      className={`relative mx-auto mt-6 grid p-0 ${
        isDateSelected 
          ? 'grid-cols-[1fr_280px] max-[900px]:grid-cols-1' 
          : 'w-[540px] grid-cols-1'
      }`}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate}  />

      {isDateSelected && (
        <div className='absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-gray-600 px-6 pt-6'>
          <h3 className='font-medium text-white'>
            {weekDay} <span>{describedDate}</span>
          </h3>

          <div className='mt-3 grid grid-cols-1 gap-2 max-[900px]:grid-cols-2'>
            {availability?.possibleTimes.map((hour) => {
              return (
                <button 
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </button>
              )
            })}
            
          </div>
        </div>
      )}
    </div>
  )
}