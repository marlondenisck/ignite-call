import { google } from 'googleapis'
import { NextRequest } from 'next/server'
import { z } from 'zod'

import dayjs from '@/lib/dayjs'
import { getGoogleOAuthToken } from '@/lib/google'
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

    const scheduling = await prisma.scheduling.create({
      data: {
        name,
        email,
        observations: observations || '',
        date: schedulingDate.utc().toDate(),
        user_id: user.id,
      },
    })

    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: await getGoogleOAuthToken(user.id),
      })

      await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: {
          summary: `Ignite Call: ${name}`,
          description: observations,
          start: {
            dateTime: schedulingDate.utc().format(),
          },
          end: {
            dateTime: schedulingDate.add(1, 'hour').utc().format(),
          },
          attendees: [{ email, displayName: name }],
          conferenceData: {
            createRequest: {
              requestId: scheduling.id,
              conferenceSolutionKey: {
                type: 'hangoutsMeet',
              },
            },
          },
        },
      })
    } catch (googleError) {
      console.error('Erro ao criar evento no Google Calendar:', googleError)
      // Não falhamos a requisição se o Google Calendar falhar
      // O agendamento já foi salvo no banco
    }

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