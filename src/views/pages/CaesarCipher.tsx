import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const CipherPage = () => {
  const [key, setKey] = useState<number>(3);
  const [plaintext, setPlaintext] = useState<string>("");
  const [ciphertext, setCiphertext] = useState<string>("");

  const encrypt = () => {
    const encryptedText = plaintext
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const base = char.charCodeAt(0) < 97 ? 65 : 97;
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + key) % 26) + base
          );
        }
        return char;
      })
      .join("");
    setCiphertext(encryptedText);
  };

  const decrypt = () => {
    const decryptedText = ciphertext
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const base = char.charCodeAt(0) < 97 ? 65 : 97;
          return String.fromCharCode(
            ((char.charCodeAt(0) - base - key + 26) % 26) + base
          );
        }
        return char;
      })
      .join("");
    setPlaintext(decryptedText);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Encryption & Decryption</h1>

      <div className="mb-4">
        <label className="block mb-2">Key (k):</label>
        <Input
          type="number"
          value={key}
          onChange={(e) => setKey(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Plaintext:</label>
        <Input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
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
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Ciphertext:</h2>
        <p className="p-2 border">{ciphertext}</p>
      </div>
    </div>
  );
};

export default CipherPage;
