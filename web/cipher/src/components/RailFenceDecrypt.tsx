import { useState } from 'react';

const RailFenceDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [numRails, setNumRails] = useState(3);
  const [plainText, setPlainText] = useState('');

  const handleDecrypt = () => {
    const result = railFenceDecrypt(cipherText, numRails);
    setPlainText(result);
  };

  const railFenceDecrypt = (cipher: string, rails: number): string => {
    if (rails <= 1 || cipher.length === 0) return cipher;

    const len = cipher.length;
    const railMatrix = Array.from({ length: rails }, () => Array(len).fill('\n'));

    let dirDown = false;
    let row = 0, col = 0;

    for (let i = 0; i < len; i++) {
      if (row === 0 || row === rails - 1) dirDown = !dirDown;
      railMatrix[row][col++] = '*';
      row += dirDown ? 1 : -1;
    }

    let index = 0;
    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < len; j++) {
        if (railMatrix[i][j] === '*' && index < cipher.length) {
          railMatrix[i][j] = cipher[index++];
        }
      }
    }

    let result = '';
    row = 0;
    col = 0;
    dirDown = false;

    for (let i = 0; i < len; i++) {
      if (row === 0 || row === rails - 1) dirDown = !dirDown;
      result += railMatrix[row][col++];
      row += dirDown ? 1 : -1;
    }

    return result;
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập ciphertext" value={cipherText} onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />
      <input type="number" placeholder="Số đường ray" value={numRails} onChange={(e) => setNumRails(parseInt(e.target.value))} className="form_input_encrypt" min={2} />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default RailFenceDecrypt;
