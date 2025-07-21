import React, { useState } from 'react';

const RailFenceCipher: React.FC = () => {
  const [text, setText] = useState('');
  const [rails, setRails] = useState(3); 
  const [result, setResult] = useState('');

  const encryptRailFence = (text: string, rails: number): string => {
    if (rails < 2) return 'Số đường ray phải lớn hơn hoặc bằng 2';

    const fence: string[][] = Array.from({ length: rails }, () => []);
    let row = 0;
    let directionDown = false;

    for (let char of text) {
      fence[row].push(char);
      if (row === 0 || row === rails - 1) directionDown = !directionDown;
      row += directionDown ? 1 : -1;
    }

    return fence.flat().join('');
  };

  const handleEncrypt = () => {
    const encrypted = encryptRailFence(text, rails);
    setResult(encrypted);
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" value={text} onChange={(e) => setText(e.target.value)} className="form_input_encrypt" />
      <input type="number" placeholder="Số đường ray (rails)" value={rails} onChange={(e) => setRails(parseInt(e.target.value))} className="form_input_encrypt" min={2} />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default RailFenceCipher;
