import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, username } = await request.json()

    console.log('Dados recebidos:', { name, username })

    const user = await prisma.user.create({
      data: {
        name,
        username,
      },
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
