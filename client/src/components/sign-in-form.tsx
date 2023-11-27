import { Button, TextField } from '@radix-ui/themes'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function SignInform() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const { mutate: login } = useMutation({
    mutationFn: async (formData: Inputs) => {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      return response.json()
    },
    onSettled: (data) => console.log(data)
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => login(data)

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <TextField.Input
        {...register('email', { required: true })}
        placeholder="Enter your email"
      />
      {errors.email && <span>This field is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <TextField.Input
        {...register('password', { required: true })}
        placeholder="Enter your password"
      />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <Button className="w-full" size="2">
        Submit
      </Button>
    </form>
  )
}
