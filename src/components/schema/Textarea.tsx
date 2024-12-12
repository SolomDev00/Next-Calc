import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="border-[1px] border-gray-300 shadow-lg focus:border-hover focus:outline-none outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-3 text-md w-full bg-transparent duration-150"
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;
