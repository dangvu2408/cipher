import { useState } from 'react'
import './App.css'
import CaesarEncrypt from './components/CaesarEncrypt';
import VigenereEncrypt from './components/VigenereEncrypt';
import AutokeyEncrypt from './components/AutokeyEncrypt';
import AffineEncrypt from './components/AffineEncrypt';
import RailFenceEncrypt from './components/RailFenceEncrypt';
import PlayfairEncrypt from './components/PlayfairEncrypt';
import HillEncrypt from './components/HillEncrypt';

function App() {
  const [encryptType, setEncryptType] = useState('');

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
    </>
  )
}

export default App
