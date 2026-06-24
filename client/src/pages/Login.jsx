import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Common/Input';
import { Button } from '../components/Common/Button';
import { Alert } from '../components/Common/Alert';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-md rounded border bg-white p-6">
      <h1 className="mb-4 text-xl font-semibold">Login</h1>
      {error && <Alert message={error} />}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password', { required: 'Password is required' })} error={errors.password?.message} />
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="mt-3 text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
};

export default Login;
