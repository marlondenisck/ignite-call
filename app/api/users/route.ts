import { cookies } from 'next/headers'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, username } = await request.json()

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (userExists) {
      return Response.json({ status: 400, message: 'Username já existe.' })
    }

    console.log('Dados recebidos:', { name, username })

    const user = await prisma.user.create({
      data: {
        name,
        username,
      },
    })

    const cookieStore = await cookies()
    cookieStore.set('ignite-call:userId', user.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    console.log('Usuário criado:', user)
    return Response.json(user, { status: 201 })
  } catch (error) {
    console.error('Erro na API:', error)
    return Response.json(
      {
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
