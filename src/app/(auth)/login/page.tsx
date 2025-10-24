"use client";
import { z } from "zod";
import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const Login = () => {
  const [errors, setErrors] = useState({});
  const formRef = useRef<HTMLFormElement>(null);
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    return {
      errors: {},
    };
  };
  useGSAP(
    () => {
      gsap.fromTo(
        ".form-root",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power2.inOut",
          delay: 0.1,
        }
      );
    },
    { scope: formRef }
  );
  return (
    <Form
      ref={formRef}
      className="w-full max-w-md space-y-4 flex flex-col items-center justify-center px-2 "
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        const response = await submitForm(event);
        setErrors(response.errors);
      }}
    >
      <Field.Root
        name="email"
        className="flex flex-col w-full space-y-2 form-root "
      >
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
      <Field.Root
        name="password"
        className="flex flex-col w-full space-y-2 form-root"
      >
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
      <button
        type="submit"
        className="py-3 px-4 rounded-xl border border-black hover:bg-white w-full
         hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg 
         hover:border-white text-lg overflow-hidden cursor-pointer"
      >
        Login
      </button>
    </Form>
  );
};

export default Login;
