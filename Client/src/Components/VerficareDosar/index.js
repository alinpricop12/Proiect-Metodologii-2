import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'

function VerificareDosar() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [mesajForCerere, setMesajForCerere] = useState('');
    const [mesajVerificare, setMesajVerificare] = useState({type: '', mesaj: ''})

    const handleVerificare = () => {
        console.log('state', state);
        let mesaj = 'Studentului ii LIPSESC urmatoarele acte: ';
        const acteLipsa = [];
        for (const key in state.acteDosar) {
            if (state.acteDosar[key] === false) {
                acteLipsa.push(key);
            }
        }
        console.log('acteLipsa', acteLipsa);
        for (let i = 0; i < acteLipsa.length; i++) {
            if (acteLipsa[i] === 'pasaport') mesaj = mesaj + 'pasaportul,';
            if (acteLipsa[i] === 'fotografii') mesaj = mesaj + ' cele 2 fotografii tip pasaport,';
            if (acteLipsa[i] === 'taxaViza') mesaj = mesaj + ' dovada achitarii taxei de viza,';
            if (acteLipsa[i] === 'dovadaMedicala') mesaj = mesaj + ' dovada asigurarii medicale,';
            if (acteLipsa[i] === 'dovadaFinantare') mesaj = mesaj + ' dovada finantarii ';
        }
        if (acteLipsa.length !== 0) setMesajVerificare({type: 'lipsa', mesaj});
        if (acteLipsa.length === 0) {
            mesaj = 'Studentului nu-i lipseste niciun act!';
            setMesajVerificare({type: 'succes', mesaj});
        }
        console.log('mesaj', mesaj);
    };

    const handleRespingereDosar = () => {
        axios.post('http://localhost:3001/respingereDosar', { ...state, mesajRespingere: mesajForCerere} )
            .then((result) => navigate('/cerere'));
    }

    const handleAprobaDosar = () => {
        axios.post('http://localhost:3001/aprobareDosar', { ...state, mesajAprobare: mesajForCerere} )
        .then((result) => navigate('/cerere'));
    }
  return (
    <div className='container_verficareDosar'> 
        <div className='backgroundImage'/>
        <div className='container_verificareDosar_elements'>
            <div className='container_numeStudent'>
                <strong className='numeStudent'>Numele studentului: {state.nume} {state.prenume}</strong>
            </div>
            <div className='verificareDosarComplet'>
                <div onClick={() => handleVerificare()} className='verficareDosar_label'>Verificare dosar</div>
                <div className={`mesajVerficare ${mesajVerificare.type === 'lipsa' ? 'acteIncomplete' : 'acteComplete'}`}>{mesajVerificare.mesaj}</div>
            </div>
            {mesajVerificare.type === 'lipsa' ? (
                <div className='containerDosarRespins'>
                    <input placeholder='Mesaj pentru student' type='text' onChange={(e) => setMesajForCerere(e.target.value)} />
                    {mesajVerificare.type !== '' ? <div onClick={() => handleRespingereDosar()} className={`butonDosarRespins ${mesajForCerere && mesajVerificare.type === 'lipsa' ? '' : 'disabled'}`}>Respinge dosarul</div> : ''}
                </div>
            ) : (
                <div className='containerDosarRespins'>
                    <input placeholder='Mesaj pentru student' type='text' onChange={(e) => setMesajForCerere(e.target.value)} />
                    {mesajVerificare.type !== '' ? <div onClick={() => handleAprobaDosar()} className={`butonDosarAprobat ${mesajForCerere && mesajVerificare.type === 'succes' ? '' : 'disabled'}`}>Aproba dosarul</div> : ''}
                </div>
            )}
            
        </div>
    </div>
  )
}

export default VerificareDosar;