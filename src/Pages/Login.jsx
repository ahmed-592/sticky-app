
import { useState } from 'react'
import { Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../Schema/login.Schema';
import { sendSignInData } from '../Services/SignIn';
import { useNavigate } from 'react-router-dom';




export default function Login() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {

      email: '',
      password: '',

    },
    resolver: zodResolver(schema)
  });



  async function signIn(userDate) {

    try {
      setLoading(true);
      const res = await sendSignInData(userDate);
      setMessage(res.msg);
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
      console.log(res);
    } catch (err) {
      setMessage(err);

    } finally {
      setLoading(false);

    }
  }





  return <>

    <div className='w-[70%] md:w-[50%] shadow-2xl p-5 md:p-10 rounded-2xl'>


      <h2 className="text-2xl font-bold mb-4">Login Now</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(signIn)}
      >


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



        <div className="flex gap-2">

          <Button isLoading={loading} color="primary" type="submit">
            Login
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
