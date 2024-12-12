import "./Elements.Style.css";
import { useState } from "react";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

export default function SwitchButton() {
    const [checked, setChecked] = useState<boolean>(true);

    return (
        <div className="card flex justify-content-center">
            <InputSwitch checked={checked} onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)} disabled/>
        </div>
    );
}