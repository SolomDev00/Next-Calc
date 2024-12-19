import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { SoLock, SoSecurityLock, SoSquareLockCheck } from "solom-icon";
import toast from "react-hot-toast";

const CipherPage = () => {
    const [key, setKey] = useState<number>(3);
    const [plaintext, setPlaintext] = useState<string>("");
    const [ciphertext, setCiphertext] = useState<string>("");

    const encrypt = () => {
        if (!plaintext) {
            toast.error("الرجاء إدخال نص للتشفير");
            return;
        }

        const encryptedText = plaintext
            .split("")
            .map((char) => {
                if (char.match(/[a-zA-Z]/)) {
                    const base = char.charCodeAt(0) < 97 ? 65 : 97;
                    return String.fromCharCode(
                        ((char.charCodeAt(0) - base + key) % 26) + base
                    );
                } else if (char.match(/[ء-ي]/)) {
                    const base = 0x0621;
                    const range = 28;
                    const charCode = char.charCodeAt(0);
                    const newCharCode = ((charCode - base + key) % range + range) % range + base;
                    return String.fromCharCode(newCharCode);
                }
                return char;
            })
            .join("");
        setCiphertext(encryptedText);
    };

    const decrypt = () => {
        if (!ciphertext) {
            toast.error("الرجاء إدخال نص مشفر لفك التشفير");
            return;
        }

        const decryptedText = ciphertext
            .split("")
            .map((char) => {
                if (char.match(/[a-zA-Z]/)) {
                    const base = char.charCodeAt(0) < 97 ? 65 : 97;
                    return String.fromCharCode(
                        ((char.charCodeAt(0) - base - key + 26) % 26) + base
                    );
                } else if (char.match(/[ء-ي]/)) {
                    const base = 0x0621;
                    const range = 28;
                    const charCode = char.charCodeAt(0);
                    const newCharCode = ((charCode - base - key + range) % range + range) % range + base;
                    return String.fromCharCode(newCharCode);
                }
                return char;
            })
            .join("");
        setPlaintext(decryptedText);
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-primary mb-4">
                Encryption & Decryption
            </h1>
            <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative mb-3">
                <div className="bg-accent text-white p-2 pr-20 rounded-l-md flex items-center gap-3">
                    <SoLock className="w-5 h-5" />
                    <span className="text-base font-semibold w-fit max-sm:hidden">Key</span>
                </div>
                <Input
                    type="number"
                    value={key}
                    onChange={(e) => setKey(Number(e.target.value))}
                />
            </div>
            <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative mb-3">
                <div className="bg-accent text-white p-2 pr-10 rounded-l-md flex items-center gap-3">
                    <SoSecurityLock className="w-5 h-5" />
                    <span className="text-base font-semibold w-fit max-sm:hidden">
                        Plaintext
                    </span>
                </div>
                <Input
                    type="text"
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                />
            </div>
            <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative mb-5">
                <div className="bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3">
                    <SoSquareLockCheck className="w-5 h-5" />
                    <span className="text-base font-semibold w-fit max-sm:hidden">
                        Ciphertext
                    </span>
                </div>
                <Input
                    type="text"
                    value={ciphertext}
                    onChange={(e) => setCiphertext(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3">
                <Button fullWidth onClick={encrypt}>
                    Encrypt
                </Button>
                <Button fullWidth onClick={decrypt} variant={"danger"}>
                    Decrypt
                </Button>
            </div>
        </div>
    );
};

export default CipherPage;
