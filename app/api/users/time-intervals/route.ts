import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
})

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userTimeIntervals = await prisma.userTimeInterval.findMany({
    where: {
      user_id: session.user?.id,
    },
  })

  return NextResponse.json({ intervals: userTimeIntervals })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { intervals } = timeIntervalsBodySchema.parse(body)

  // Deleta todos os intervalos existentes do usuário
  await prisma.userTimeInterval.deleteMany({
    where: {
      user_id: session.user?.id,
    },
  })

  // Cria os novos intervalos
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    })
  )

  return new NextResponse(null, { status: 201 })
}
