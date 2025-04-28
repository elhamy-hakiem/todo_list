import React from 'react'
import Image from '../../assets/defaultImage.jpg'

interface Props {
  title: string
  imageUrl?: string
  onImageUpload: (imageUrl: string) => void // New prop to handle image upload
}

const TodoHeader: React.FC<Props> = ({ title, imageUrl, onImageUpload }) => {
  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        onImageUpload(imageUrl) // Pass the image URL to the parent component
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='relative w-full h-64 mb-6 rounded-xl overflow-hidden'>
      <img src={imageUrl || Image} alt='Cover' className='w-full h-full object-cover shadow-lg' />
      {/* Overlay for better text visibility */}
      <div className='absolute inset-0 bg-black opacity-40'></div>
      <div className='absolute inset-0 flex justify-center items-center text-white'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold text-center px-4 py-2 bg-black bg-opacity-50 rounded-lg shadow-lg'>
          {title}
        </h1>
      </div>

      {/* Image upload input */}
      <div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='bg-gray-700-500 text-white p-2 rounded-md cursor-pointer w-auto '
        />
      </div>
    </div>
  )
}

export default TodoHeader
