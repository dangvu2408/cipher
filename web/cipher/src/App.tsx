import { useState } from 'react'
import './App.css'
import CaesarEncrypt from './components/CaesarEncrypt';
import CaesarDecrypt from './components/CaesarDecrypt';

import VigenereEncrypt from './components/VigenereEncrypt';
import VigenereDecrypt from './components/VigenereDecrypt ';

import AutokeyEncrypt from './components/AutokeyEncrypt';
import AutokeyDecrypt from './components/AutokeyDecrypt';

import AffineEncrypt from './components/AffineEncrypt';
import AffineDecrypt from './components/AffineDecrypt';

import RailFenceEncrypt from './components/RailFenceEncrypt';
import RailFenceDecrypt from './components/RailFenceDecrypt';

import PlayfairEncrypt from './components/PlayfairEncrypt';
import PlayfairDecrypt from './components/PlayfairDecrypt';

import HillEncrypt from './components/HillEncrypt';
import HillDecrypt from './components/HillDecrypt';

import RC4Encrypt from './components/RC4Encrypt';

import DESEncrypt from './components/DESEncrypt';


function App() {
  const [encryptType, setEncryptType] = useState('');
  const [decryptType, setDecryptType] = useState('');

  const renderEncryptComponent = () => {
    switch (encryptType) {
      case 'Caesar':
        return <CaesarEncrypt />;
      case 'Vigenère':
        return <VigenereEncrypt />;
      case 'Autokey':
        return <AutokeyEncrypt />;
      case 'Affine':
        return <AffineEncrypt />;
      case 'Rail fence':
        return <RailFenceEncrypt />;
      case 'Playfair':
        return <PlayfairEncrypt />;
      case 'Hill (2x2)':
        return <HillEncrypt />;
      case 'RC4':
        return <RC4Encrypt />;
      case 'DES':
        return <DESEncrypt />;
      default:
        return null;
    }
  };

  const renderDecryptComponent = () => {
    switch (decryptType) {
      case 'Caesar':
        return <CaesarDecrypt />;
      case 'Vigenère':
        return <VigenereDecrypt />;
      case 'Autokey':
        return <AutokeyDecrypt />;
      case 'Affine':
        return <AffineDecrypt />;
      case 'Rail fence':
        return <RailFenceDecrypt />;
      case 'Playfair':
        return <PlayfairDecrypt />;
      case 'Hill (2x2)':
        return <HillDecrypt />;
      case 'RC4':
        return <RC4Encrypt />;
      case 'DES':
        return <DESEncrypt />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='title'>Mã hóa các hệ mật</div>
      <div className="card">
        <div className='row'>
          <select className="form_input_encrypt" id='select' name='select' required onChange={e => setEncryptType(e.target.value)}>
            <option value={""}>Chọn loại mã hóa</option>
            <option value={"Caesar"}>Caesar</option>
            <option value={"Vigenère"}>Vigenère</option>
            <option value={"Autokey"}>Autokey</option>
            <option value={"Affine"}>Affine</option>
            <option value={"Rail fence"}>Rail fence</option>
            <option value={"Playfair"}>Playfair</option>
            <option value={"Hill (2x2)"}>Hill (2x2)</option>
            <option value={"RC4"}>RC4</option>
            <option value={"DES"}>DES</option>
          </select>
        </div>
        {renderEncryptComponent()}
      </div>

      <div className='title'>Giải mã các hệ mật</div>
      <div className="card">
        <div className='row'>
          <select className="form_input_encrypt" id='select' name='select' required onChange={e => setDecryptType(e.target.value)}>
            <option value={""}>Chọn loại mã hóa</option>
            <option value={"Caesar"}>Caesar</option>
            <option value={"Vigenère"}>Vigenère</option>
            <option value={"Autokey"}>Autokey</option>
            <option value={"Affine"}>Affine</option>
            <option value={"Rail fence"}>Rail fence</option>
            <option value={"Playfair"}>Playfair</option>
            <option value={"Hill (2x2)"}>Hill (2x2)</option>
            <option value={"RC4"}>RC4</option>
            <option value={"DES"}>DES</option>
          </select>
        </div>
        {renderDecryptComponent()}
      </div>
    </>
  )
}

export default App
