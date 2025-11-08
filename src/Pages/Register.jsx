import { useState } from 'react'
import { Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Schema/registerSchema.js';
import { sendSignUpData } from '../Services/SignUp.js';
import { useNavigate } from 'react-router-dom';





export default function Register() {


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: '',
    },
    resolver: zodResolver(schema)
  });



  async function signUP(userData) {
    try {
      setLoading(true);
      const response = await sendSignUpData(userData);
      setMessage(response);
      if (response == "done") {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  }


  return <>

    <div className='w-[70%] md:w-[50%] shadow-2xl p-5 md:p-10 rounded-2xl'>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        className=" flex flex-col gap-4"
        onSubmit={handleSubmit(signUP)}
      >
        <Input
          isRequired
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          labelPlacement="outside"
          placeholder="Enter your username"
          type="text"
          {...register("name")}
        />



        <Input
          isRequired
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />
        <Input
          isRequired
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}

          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />
        <Input
          isRequired
          isInvalid={Boolean(errors.age)}
          errorMessage={errors.age?.message}
          labelPlacement="outside"
          placeholder="Enter your Age"
          type="number"
          {...register("age")}
        />
        <Input
          isRequired
          isInvalid={Boolean(errors.phone)}
          errorMessage={errors.phone?.message}
          labelPlacement="outside"
          placeholder="Enter your Phone"
          type="text"
          {...register("phone")}
        />




        <div className="flex gap-2">
          <Button isLoading={loading} color="primary" type="submit">
            Register
          </Button>

          <Button type="reset" variant="flat" onPress={() => reset()}>
            Reset
          </Button>
        </div>
        <p className={message == 'done' ? "text-center text-green-500" : "text-center text-red-500"} >{message}</p>
      </form>
    </div>

  </>
}





