const Register = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create an Account
          </h2>
  
          <form className="space-y-5">
            <div>   
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="yourusername"
              />
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
  
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
  
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Register;import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import axios from "../utils/AxiosInstance";
  import { useMutation } from "@tanstack/react-query";
  
  export type RegisterInput = {
    email: string;
    username: string;
    password: string;
  };
  
  const Register = () => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<RegisterInput>();
    const handleRegister = async (data: RegisterInput) => {
      try {
        await axios.post("/api/auth/register", {
          email: data.email,
          username: data.username,
          password: data.password
        });
        alert("User successfully registered");
        navigate("/login");
      } catch (err) {
        alert("username or email already registered");
      }
    };
    const { mutate, isPending } = useMutation({ mutationFn: handleRegister });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          {isPending && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20 rounded-2xl">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create an Account
          </h2>
  
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => mutate(data))}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="yourusername"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-600 text-xs italic" id="titleError">
                  Username is required.
                </p>
              )}
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-xs italic" id="titleError">
                  Email is required.
                </p>
              )}
            </div>
  
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-xs italic" id="titleError">
                  Password is required.
                </p>
              )}
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
  
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              className="text-blue-600 hover:underline"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default Register;