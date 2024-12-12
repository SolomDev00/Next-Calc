import "./Elements.Style.css";

interface RadioButtonProps {
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    label: string;
    disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onChange, label, disabled }) => {
    return (
        <div           
            className={`radio ${checked ? "radio-checked" : ""} ${disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => onChange(value)}
        >
            <div className={`radio-box ${checked ? "radio-box-checked" : ""}`}>
                {checked && <div className="radio-icon"></div>}
            </div>
            <label className="radio-label">{label}</label>
        </div>
    );
};

export default RadioButton;
