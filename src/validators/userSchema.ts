import { z } from 'zod';

const plans = ['free', 'basic', 'intermediate', 'premium'] as const;

export type Plans = (typeof plans)[number];

// export const mappedPlans = plans.map((plan) => ({ value: plan, label: plan }));

export const mappedPlans: { [key in Plans]: string } = {
  free: 'Gratis',
  basic: 'Básico',
  intermediate: 'Intermedio',
  premium: 'Premium',
};

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'El nombre debe tener al menos 3 caracteres.',
      })
      .max(200, {
        message: 'El nombre debe tener menos de 200 caracteres.',
      }),

    email: z.string().email({
      message: 'El email debe ser un email válido.',
    }),

    password: z.string().min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres.',
    }),

    confirmPassword: z.string().min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres.',
    }),

    dateOfBirth: z
      .string()
      .refine((dob) => new Date(dob).toString() !== 'Invalid Date', {
        message: 'La fecha de nacimiento debe ser una fecha válida.',
      })
      .refine((dob) => new Date(dob) < new Date(), {
        message: 'La fecha de nacimiento debe ser menor a la fecha actual.',
      }),

    weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
      message: 'El peso debe ser un número.',
    }),

    plan: z.enum(plans, {
      errorMap: () => ({ message: 'Seleecione un plan válido.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Los passwords no coinciden.',
    path: ['confirmPassword'],
  });
