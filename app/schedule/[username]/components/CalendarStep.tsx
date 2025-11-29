import { Calendar } from '@/app/components/Calendar'

export function CalendarStep() {
  const isDateSelected = true

  return (
    <div 
      className={`relative mx-auto mt-6 grid p-0 ${
        isDateSelected 
          ? 'grid-cols-[1fr_280px] max-[900px]:grid-cols-1' 
          : 'w-[540px] grid-cols-1'
      }`}
    >
      <Calendar />

      {isDateSelected && (
        <div className='absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-gray-600 px-6 pt-6'>
          <h3 className='font-medium text-white'>
            terça-feira <span className='text-gray-200'>20 de setembro</span>
          </h3>

          <div className='mt-3 grid grid-cols-1 gap-2 max-[900px]:grid-cols-2'>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              08:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              09:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              10:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              11:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              12:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              13:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              14:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              15:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              16:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              17:00h
            </button>
            <button className='cursor-pointer rounded-sm border-0 bg-gray-600 px-0 py-2 text-sm leading-6 text-gray-100 last:mb-6 hover:bg-gray-500 focus:shadow-[0_0_0_2px_#e1e1e6] disabled:cursor-default disabled:bg-transparent disabled:opacity-40'>
              18:00h
            </button>
          </div>
        </div>
      )}
    </div>
  )
}