import { InputText } from "primereact/inputtext";
import { SoCheckBadge, SoXmarkCircle } from "solom-icon";
import { IFormField } from "../../views/dashboard/pages/Settings/MyProfile";

const InputField = ({ label, icon, name, value, onChange, hasChanged, type = 'text', error, className, disabled, clDisabled }: IFormField) => (
    <div className='w-full flex flex-col'>
        <div className={`w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative ${clDisabled}`}>
            <div className={`bg-accent p-2 rounded-l-md flex items-center gap-3 ${className}`}>
                {icon}
                <span className='text-base text-primary font-semibold w-fit max-sm:hidden'>{label}</span>
            </div>
            <InputText name={name} value={value} className={`p-2 w-full focus:outline-none focus:border-0`} onChange={onChange} type={type} disabled={disabled} />
            {hasChanged && value && !error && (
                <SoCheckBadge className={`absolute right-${type === 'password' ? '10' : '4'} right-4 text-green-500`} />
            )}
            {error && (
                <SoXmarkCircle className={`absolute right-${type === 'password' ? '10' : '4'} right-4 text-red-500`} />
            )}
            {icon === 'SoLock' && (
                <div className="w-full absolute right-10 cursor-pointer">
                </div>
            )}
        </div>
    </div>
);

export default InputField;