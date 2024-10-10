import React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validators/productSchema';
import { z } from 'zod';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export type FormValues = z.infer<typeof productSchema>


const CreateProductForm = ({onSubmit}: {onSubmit: (formValues: FormValues)=>void}) => {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues:{
          name:"",
          description:"",
          price:0,
        
        }
    });
    const fileRef = form.register('image');
    const handleSubmit = (values: FormValues ) => {
      //submit the form
      onSubmit(values);
    }
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Chocobar' {...field} />
                </FormControl>
                
                <FormMessage /> 
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                </FormControl>
                <Textarea {...field}/>
                <FormMessage /> 
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="image"
            render={({field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                <Input type="file" {...fileRef} />

                </FormControl>
              
                <FormMessage /> 
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                <Input type="number" 
                {...field} 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
                />
                </FormControl>
                <FormMessage /> 
              </FormItem>
            )}
          />
          <Button className='w-full'>Submit</Button>
        </form>
      </Form>
      </FormProvider>
    )
  
}

export default CreateProductForm