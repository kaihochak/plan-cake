import React from 'react'
import { Button } from '@/components/ui/Button'
const PickATime = () => {
  return (
    <Button
        size="md"
        className="w-[100px] h-[25px] border-none bg-accent"
        onClick={() => console.log('PickATime')}
    >
        <p className='text-m-s text-accent-foreground'>Add Availability</p>
    </Button>
  )
}

export default PickATime