"use client";
import { useAuthStore } from "@/store/AuthStore";
import { API_URL } from "../../_constants/API_URL";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.accessToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const result = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const json = await result.json();

    if (result.ok) {
      setToken(json.accessToken);
    }
  };

  return (
    <div className="w-full min-h-screen flex-col flex justify-center items-center">
      <div className="flex flex-col border border-black rounded-lg justify-center items-center p-2">
        <h2 className="text-xl mb-2">Login</h2>

        <form
          className="auth-form flex-col flex items-center justify-between gap-3 p-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full text-md">
            <div className="flex justify-between">
              <label htmlFor="email">Email</label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <input
              id="email"
              type="email"
              placeholder="test@email.com"
              className="border rounded-lg p-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Incorrect email format",
                },
              })}
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <input
              id="password"
              type="password"
              className="border rounded-lg p-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>

          <button className="btn-md btn btn-accent mt-2" type="submit">
            Login
          </button>
          <p>{token ? token : ""}</p>
        </form>
      </div>
    </div>
  );
}
