import Image from 'next/image'

import previewImage from '@/app/assets/app-preview.png'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className='ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20 overflow-hidden max-lg:gap-10 max-md:max-w-full max-md:flex-col max-md:gap-8 max-md:px-6'>
      <div className='max-w-[480px] px-10 max-md:max-w-none max-md:px-0 max-md:text-center'>
        <h1 className='text-6xl leading-tight font-bold text-gray-50 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl'>
          Agendamento descomplicado
        </h1>
        <p className='mt-6 text-xl leading-relaxed text-gray-100 max-lg:text-lg max-md:text-base'>
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </div>

      <div className='flex h-full max-h-96 w-full min-w-max overflow-hidden pr-8 max-md:flex max-md:justify-center max-md:pr-0 max-sm:hidden'>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt='Calendário simbolizando aplicação em funcionamento'
          className='h-full w-auto object-contain'
        />
      </div>
    </div>
  )
}
