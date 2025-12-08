'use client'

import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo,useState } from 'react'

import dayjs from '@/lib/dayjs'
import { getWeekDays } from '@/utils/get-week-days'

interface CalendarDayProps {
  children: React.ReactNode
  disabled?: boolean
  onDateSelected: (date: Date) => void
  date: dayjs.Dayjs
}

function CalendarDay({ children, disabled, onDateSelected, date }: CalendarDayProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => onDateSelected(date.toDate())}
      className={`aspect-square w-10 h-10 mx-auto rounded-md text-center leading-none ${
        disabled
          ? 'cursor-default opacity-40'
          : 'cursor-pointer bg-gray-600 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] transition-colors'
      } `}
    >
      {children}
    </button>
  )
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
    
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

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 6 - lastWeekDay,
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<Array<Array<{ date: dayjs.Dayjs; disabled: boolean }>>>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push(original.slice(i, i + 7))
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])



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
      <table className='w-full table-fixed border-spacing-2'>
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
          {calendarWeeks.map((week, i) => {
            return (
              <tr key={i} className='h-12 w-12'>
                {week.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay disabled={disabled} onDateSelected={onDateSelected} date={date}>
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
