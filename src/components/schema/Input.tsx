import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="text-gray-400 focus:outline-none outline-none rounded-lg px-3 py-2 text-md w-full bg-transparent duration-200"
      {...rest}
    />
  );
});

export default Input;
