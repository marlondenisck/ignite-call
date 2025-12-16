import { NextRequest } from 'next/server'

import dayjs from '@/lib/dayjs'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { searchParams } = new URL(request.url)
    const { username } = await params
    const date = searchParams.get('date')

    if (!date) {
      return Response.json({ message: 'Date not provided.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return Response.json({ message: 'User does not exist.' }, { status: 400 })
    }

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if (isPastDate) {
      return Response.json({ possibleTimes: [], availableTimes: [] })
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: referenceDate.get('day'),
      },
    })

    if (!userAvailability) {
      return Response.json({ possibleTimes: [], availableTimes: [] })
    }

    const { time_start_in_minutes, time_end_in_minutes } = userAvailability

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map(
      (_, i) => {
        return startHour + i
      },
    )

    const blockedTimes = await prisma.scheduling.findMany({
      select: {
        date: true,
      },
      where: {
        user_id: user.id,
        date: {
          gte: referenceDate.startOf('day').toDate(),
          lte: referenceDate.endOf('day').toDate(),
        },
      },
    })

    const availableTimes = possibleTimes.filter((time) => {
      const isTimeBlocked = blockedTimes.some((blockedTime) => {
        const blockedHour = dayjs(blockedTime.date).tz('America/Cuiaba').hour()
        return blockedHour === time
      })

      const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())
  
      return !isTimeBlocked && !isTimeInPast
    })

    return Response.json({ possibleTimes, availableTimes })
  } catch (error) {
    console.error('Error in availability API:', error)
    return Response.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}