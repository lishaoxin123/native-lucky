import React, { useState } from 'react'

export const useDisclose = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }

  return [
    isOpen,
    onOpen,
    onClose
  ]
}
