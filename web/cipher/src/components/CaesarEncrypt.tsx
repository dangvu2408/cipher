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
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" className='form_input_encrypt' value={input} onChange={e => setInput(e.target.value)} />
      <input type="number" className='form_input_encrypt' value={key} onChange={e => setKey(Number(e.target.value))} />
      <button onClick={handleEncrypt} className='btn_encrypt'>Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{output}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default CaesarCipher;
