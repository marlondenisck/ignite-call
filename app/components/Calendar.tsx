'use client'

import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react'

import dayjs from '@/lib/dayjs'
import { getWeekDays } from '@/utils/get-week-days'

interface CalendarDayProps {
  children: React.ReactNode
  disabled?: boolean
}

function CalendarDay({ children, disabled }: CalendarDayProps) {
  return (
    <button
      disabled={disabled}
      className={`aspect-square w-full rounded-sm text-center leading-none ${
        disabled
          ? 'cursor-default opacity-40'
          : 'cursor-pointer bg-gray-600 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6]'
      } `}
    >
      {children}
    </button>
  )
}

export function Calendar() {
const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')
  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Calendar Header */}
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-white capitalize'>
          {currentMonth} <span className='text-gray-200'>{currentYear}</span>
        </h2>

        <div className='flex gap-2 text-gray-200'>
          <button 
            onClick={handlePreviousMonth}
            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm leading-none hover:text-gray-100 focus:shadow-[0_0_0_2px_#e1e1e6]'>
            <CaretLeft className='h-5 w-5' />
          </button>
          <button 
            onClick={handleNextMonth}
            className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm leading-none hover:text-gray-100 focus:shadow-[0_0_0_2px_#e1e1e6]'>
            <CaretRight className='h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Calendar Body */}
      <table className='w-full table-fixed border-spacing-1'>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay} className='text-sm font-medium text-gray-200'>
                {weekDay}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:h-3 before:text-gray-800 before:content-['.']">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
