import { useState } from 'react';
import { register } from '../utils/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registeredUser = await register(email, password);
      toast.success("Account created successfully!");
      console.log(registeredUser);
      navigate('/login'); // 👈 Optional: redirect to login page
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 border border-base-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-base-content-600 mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary flex items-center justify-center gap-2"
        >
          {loading && <span className="loading loading-spinner loading-sm" />}
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-6 flex justify-center text-sm text-gray-600">
        <span className="me-2">Already have an account? </span>
        <a href="/login" className="hover:text-blue-600">Login</a>
      </div>
    </div>
  );
}
