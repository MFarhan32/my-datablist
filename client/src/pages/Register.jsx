import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Common/Input';
import { Button } from '../components/Common/Button';
import { Alert } from '../components/Common/Alert';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-md rounded border bg-white p-6">
      <h1 className="mb-4 text-xl font-semibold">Register</h1>
      {error && <Alert message={error} />}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: '8+ chars' } })} error={errors.password?.message} />
        <Input label="Confirm Password" type="password" {...register('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords must match' })} error={errors.confirmPassword?.message} />
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <p className="mt-3 text-sm">Already registered? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
};

export default Register;
