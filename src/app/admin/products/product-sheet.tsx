import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import React from 'react'
import CreateProductForm, { FormValues } from './create-product-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/http/api'
import { useNewPoduct } from '@/store/product/product-store'

const ProductSheet = () => {
    const {isOpen, onClose} = useNewPoduct()
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data: FormData) => createProduct(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products']});
          alert('Product created successfully')
        }

      })
    
  const onSubmit = (values: FormValues) => {
    console.log('values', values);
    const formdata = new FormData()
    formdata.append('name', values.name)
    formdata.append('description', values.description)
    formdata.append('price', values.price.toString())
    formdata.append('image', (values.image as FileList)[0])

    mutate(formdata)
  }
  return (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent className='min-w-[28rem] space-y-4'>
        <SheetHeader>
        <SheetTitle>Create Product</SheetTitle>
        <SheetDescription>
            Create a new product
        </SheetDescription>
        </SheetHeader>
       <CreateProductForm onSubmit={onSubmit}/>
    </SheetContent>
  </Sheet>
  )
}

export default ProductSheet