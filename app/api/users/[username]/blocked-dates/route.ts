import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { searchParams } = new URL(request.url)
    const { username } = await params
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    if (!year || !month) {
      return Response.json({ message: 'Year or month not specified.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return Response.json({ message: 'User does not exist.' }, { status: 400 })
    }

    const availableWeekDays = await prisma.userTimeInterval.findMany({
      select: {
        week_day: true,
      },
      where: {
        user_id: user.id,
      },
    })

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

    return Response.json({ blockedWeekDays })
  } catch (error) {
    console.error('Error in blocked-dates API:', error)
    return Response.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}