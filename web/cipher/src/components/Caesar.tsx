import { useState } from 'react';

const CaesarCipher = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState(3);
  const [output, setOutput] = useState('');

  const caesarEncrypt = (text: string, k: number) => {
    return text.split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode((char.charCodeAt(0) - 65 + k) % 26 + 65);
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCharCode((char.charCodeAt(0) - 97 + k) % 26 + 97);
      }
      return char;
    }).join('');
  };

  const handleEncrypt = () => {
    setOutput(caesarEncrypt(input, key));
  };

  return (
    <div>
      <input type="text" placeholder="Nhập văn bản" value={input} onChange={e => setInput(e.target.value)} />
      <input type="number" value={key} onChange={e => setKey(Number(e.target.value))} />
      <button onClick={handleEncrypt}>Mã hóa</button>
      <div>Kết quả: {output}</div>
    </div>
  );
};

export default CaesarCipher;
