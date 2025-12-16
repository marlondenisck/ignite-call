import { NextRequest } from 'next/server'
import { z } from 'zod'

import dayjs from '@/lib/dayjs'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return Response.json({ message: 'User does not exist.' }, { status: 400 })
    }

    const createSchedulingBody = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      observations: z.string().optional(),
      date: z.string().datetime(),
    })

    const body = await request.json()
    const { name, email, observations, date } = createSchedulingBody.parse(body)

    // Converte para timezone de Cuiabá e depois para UTC para salvar no banco
    const schedulingDate = dayjs(date).tz('America/Cuiaba').startOf('hour')

    if (schedulingDate.isBefore(new Date())) {
      return Response.json({
        message: 'Date is in the past.',
      }, { status: 400 })
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        user_id: user.id,
        date: schedulingDate.utc().toDate(),
      },
    })

    if (conflictingScheduling) {
      return Response.json({
        message: 'There is another scheduling at the same time.',
      }, { status: 400 })
    }

    await prisma.scheduling.create({
      data: {
        name,
        email,
        observations: observations || '',
        date: schedulingDate.utc().toDate(),
        user_id: user.id,
      },
    })

    return Response.json({ message: 'Scheduling created successfully.' }, { status: 201 })

  } catch (error) {
    console.error('Error in schedule API:', error)
    
    if (error instanceof z.ZodError) {
      return Response.json({
        message: 'Validation error.',
        errors: error.flatten().fieldErrors,
      }, { status: 400 })
    }

    return Response.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}