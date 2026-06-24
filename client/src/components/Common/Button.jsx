import { classNames } from '../../utils/helpers';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button = ({ variant = 'primary', className, ...props }) => (
  <button className={classNames('rounded px-4 py-2 text-sm font-medium', variants[variant], className)} {...props} />
);
