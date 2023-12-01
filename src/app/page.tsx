'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, mappedPlans } from '@/validators/userSchema';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dayOfBirth: string;
  weight: string;
  plan: string;
  dateOfBirth: string;
};

function HomePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>
      {value}
    </option>
  ));

  // console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-3/5 lg:w-1/3 p-10 gap-y-2 bg-zinc-800 rounded-sm'
      >
        <h1 className='text-center text-2xl font-semibold'>
          React Hook Form + Zod
        </h1>
        <label htmlFor='name' className='text-sm'>
          Nombre:
        </label>
        <input
          type='text'
          id='name'
          className='bg-zinc-900 rounded-md p-2'
          {...register('name')}
        />
        {errors.name?.message && (
          <p className='text-red-500 text-xs'>{errors.name?.message}</p>
        )}

        <label htmlFor='email' className='text-sm'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          className='bg-zinc-900 rounded-md p-2'
          {...register('email')}
        />
        {errors.email?.message && (
          <p className='text-red-500 text-xs'>{errors.email?.message}</p>
        )}

        <label htmlFor='password' className='text-sm'>
          Password:
        </label>
        <input
          type='password'
          id='password'
          className='bg-zinc-900 rounded-md p-2'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='text-red-500 text-xs'>{errors.password?.message}</p>
        )}

        <label htmlFor='confirmPassword' className='text-sm'>
          Confirmar Password:
        </label>
        <input
          type='password'
          id='confirmPassword'
          className='bg-zinc-900 rounded-md p-2'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <p className='text-red-500 text-xs'>
            {errors.confirmPassword?.message}
          </p>
        )}

        <label htmlFor='dateOfBirth' className='text-sm'>
          Fecha de nacimiento:
        </label>
        <input
          type='date'
          id='dateOfBirth'
          className='bg-zinc-900 rounded-md p-2'
          {...register('dateOfBirth')}
        />
        {errors.dateOfBirth?.message && (
          <p className='text-red-500 text-xs'>{errors.dateOfBirth?.message}</p>
        )}

        <label htmlFor='weight' className='text-sm'>
          Peso:
        </label>
        <input
          type='text'
          id='weight'
          className='bg-zinc-900 rounded-md p-2'
          {...register('weight')}
        />
        {errors.weight?.message && (
          <p className='text-red-500 text-xs'>{errors.weight?.message}</p>
        )}

        <label htmlFor='plan' className='text-sm'>
          Plan:
        </label>
        <select
          id='plan'
          className='bg-zinc-900 rounded-md p-2'
          {...register('plan')}
        >
          {plansOptions}
        </select>
        {errors.plan?.message && (
          <p className='text-red-500 text-xs'>{errors.plan?.message}</p>
        )}

        <button
          type='submit'
          className='mt-5 p-2 bg-blue-500 hover:bg-blue-700 rounded-md w-full transition duration-500
        ease-in-out'
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default HomePage;
