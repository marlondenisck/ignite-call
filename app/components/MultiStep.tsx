interface MultiStepProps {
  size: number
  currentStep: number
}

export function MultiStep({ size, currentStep }: MultiStepProps) {
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: size }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i + 1 <= currentStep ? 'bg-gray-100' : 'bg-gray-600'
          }`}
        />
      ))}
      <span className='ml-2 text-xs text-gray-200'>
        Passo {currentStep} de {size}
      </span>
    </div>
  )
}
