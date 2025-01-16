import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../features/userSlice";
import { Link, useNavigate } from "react-router";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);

    dispatch(createUser(formData))
      .unwrap()
      .then(() => {
        navigate("/allMeet");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registration Page
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex  items-center gap-2">
            <label
              htmlFor="name"
              className=" w-20 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex  items-center gap-2">
            <label
              htmlFor="email"
              className=" w-20 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex  items-center gap-2">
            <label
              htmlFor="password"
              className="w-20 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <p className=" text-sm border border-red-200 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
          <p>
            Already Register then <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
