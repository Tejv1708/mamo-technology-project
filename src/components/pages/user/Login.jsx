import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../features/userSlice";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/allMeet");
        setEmail("");
        setPassword("");
      })
      .catch((err) => setError(err.message));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex  items-center gap-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 w-20"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex  items-center gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 w-20"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {error && (
            <p className=" text-sm border border-red-200 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <p>
            Not Register then <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
