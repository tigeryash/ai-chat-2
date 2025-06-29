"use client";
import { z } from "zod";
import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const Login = () => {
  const [errors, setErrors] = useState({});

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(formData as any));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    return {
      errors: {},
    };
  };
  return (
    <Form
      className="w-full max-w-md space-y-4 flex flex-col items-center justify-center h-[calc(100vh-10rem)]"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        const response = await submitForm(event);
        setErrors(response.errors);
      }}
    >
      <Field.Root name="email" className="flex flex-col w-[20rem] space-y-2">
        <Field.Label className="text-xl font-semibold text-sky-900">
          Email
        </Field.Label>
        <Field.Control
          placeholder="Enter email"
          className=" text-lg bg-slate-800 rounded-lg p-3 placeholder:text-slate-400 focus:outline-none focus:ring-2
           focus:ring-blue-400 text-white"
        />
        <Field.Error className="" />
      </Field.Root>
      <Field.Root name="password" className="flex flex-col w-[20rem] space-y-2">
        <Field.Label className="text-xl font-semibold text-sky-900">
          Password
        </Field.Label>
        <Field.Control
          placeholder="Enter password"
          className=" text-lg bg-slate-800 rounded-lg p-3 placeholder:text-slate-400 focus:outline-none focus:ring-2
           focus:ring-blue-400 text-white"
        />
        <Field.Error className="" />
      </Field.Root>
      <button type="submit" className="">
        Login
      </button>
    </Form>
  );
};

export default Login;
