import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border-[1px] border-gray-300 text-gray-400 focus:outline-none outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md w-full bg-transparent duration-200"
      {...rest}
    />
  );
});

export default Input;
