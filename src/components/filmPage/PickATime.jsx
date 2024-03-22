import React from 'react'
import { Button } from '@/components/ui/Button'
const PickATime = () => {
  return (
    <Button
        size="md"
        className="w-full"
        onClick={() => console.log('PickATime')}
    >
        PickATime
    </Button>
  )
}

export default PickATime