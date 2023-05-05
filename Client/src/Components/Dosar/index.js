import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './style.css';


function Dosar() {
    const navigate = useNavigate();
    const [dosarCompletat, setDosarCompletat] = useState(false);
    console.log('dosarCompletat', dosarCompletat);
    const [ fotografii, setFotografii ] = useState(null);
    const [ pasaport, setPasaport ] = useState(null);
    const [ taxaViza, setTaxaViza ] = useState(null);
    const [dovadaMedicala, setDovadaMedicala] = useState(null);
    const [dovadaFinantare, setDovadaFinantare] = useState(null);
    const { state } = useLocation();
    const [ mesajEroare, setMesajEroare ] = useState(null);
    console.log('state', state, 'fotografii', fotografii);

    const handleFotografii = (e, files) => {
        console.log('files', files[0])
        if (files.length > 2 || files.length < 2) {
            setMesajEroare({type: 'fotografie', text: 'Nu ati introdus numarul cerut de fotografii'})
            e.target.value = '';
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'image/png') {
                setMesajEroare({type: 'fotografie', text: 'Nu ati introdus formatul cerut pentru fotografii!'})
                e.target.value = ''
                return;
            }
            const words = files[i].name.split(" ");
            if (words[0] !== 'Fotografie' ||
            words[1] !== 'pasaport' || 
            words[3] !== "-" || words[4] !== state.nume || words[5] !== `${state.prenume}.png` ) {
                console.log('words', words, );
                setMesajEroare({type: 'fotografie', text: 'Nu ati introdus numele corect pentru fotografie'})
                e.target.value = ''
                return;
            }
        }
        setFotografii(files);
        setMesajEroare({})
    }

    const handlePasaport = (e, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'image/png') {
                setMesajEroare({type: 'pasaport', text: 'Nu ati introdus formatul cerut pentru pasaport!'})
                e.target.value = ''
                return;
            }
            const words = files[i].name.split(" ");
            if (words[0] !== 'Pasaport' ||
            words[1] !== '-' || 
            words[2] !== state.nume || words[3] !== `${state.prenume}.png` ) {
                setMesajEroare({type: 'pasaport', text: 'Nu ati introdus numele corect pentru pasaport!'})
                e.target.value = ''
                return;
            }
        }

        setPasaport(files);
        setMesajEroare({})
    }

    const handleTaxaViza = (e, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'image/png') {
                setMesajEroare({type: 'taxaViza', text: 'Nu ati introdus formatul cerut pentru dovada achitarii taxei de viza!'})
                e.target.value = ''
                return;
            }
            const words = files[i].name.split(" ");
            if (words[0] !== 'Taxa' ||
            words[1] !== 'Viza' || 
            words[2] !== '-' ||
            words[3] !== state.nume || words[4] !== `${state.prenume}.png` ) {
                console.log('words', words, );
                setMesajEroare({type: 'taxaViza', text: 'Nu ati introdus numele corect pentru dovada achitarii taxei de viza!'})
                e.target.value = ''
                return;
            }
        }

        setTaxaViza(files);
        setMesajEroare({});
    }

    const handleDovadaMedicala = (e, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'image/png') {
                setMesajEroare({type: 'asigurareMedicala', text: 'Nu ati introdus formatul cerut pentru dovada asigurarii medicale!'})
                e.target.value = ''
                return;
            }
            const words = files[i].name.split(" ");
            if (words[0] !== 'Asigurare' ||
            words[1] !== 'medicala' || 
            words[2] !== '-' ||
            words[3] !== state.nume || words[4] !== `${state.prenume}.png` ) {
                console.log('words', words, );
                setMesajEroare({type: 'asigurareMedicala', text: 'Nu ati introdus numele corect pentru dovada asigurarii medicale!'})
                e.target.value = ''
                return;
            }
        }

        setDovadaMedicala(files);
        setMesajEroare({});
    }

    const handleDovadaFinantare = (e, files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== 'image/png') {
                setMesajEroare({type: 'finantare', text: 'Nu ati introdus formatul cerut pentru dovada finantarii!'})
                e.target.value = ''
                return;
            }
            const words = files[i].name.split(" ");
            if (words[0] !== 'Dovada' ||
            words[1] !== 'finantare' || 
            words[2] !== '-' ||
            words[3] !== state.nume || words[4] !== `${state.prenume}.png` ) {
                console.log('words', words, );
                setMesajEroare({type: 'finantare', text: 'Nu ati introdus numele corect pentru dovada finantarii!'})
                e.target.value = ''
                return;
            }
        }

        setDovadaFinantare(files);
        setMesajEroare({});
    }

    const handleSubmit = () => {
        if (fotografii === null && pasaport === null && taxaViza === null && dovadaMedicala === null && dovadaFinantare === null) {
            setMesajEroare({type: 'submit', text: 'Completati campurile pentru a putea da submit la dosar!'})
            return;
        }
        setMesajEroare({});
        const objectToSend = {
            pasaport: pasaport ? true : false,
            fotografii: fotografii ? true : false,
            taxaViza: taxaViza ? true : false,
            dovadaMedicala: dovadaMedicala ? true : false,
            dovadaFinantare: dovadaFinantare ? true : false,
        }
        axios.post(`http://localhost:3001/acteDosar/${state._id}`, objectToSend)
            .then((result) => {
                console.log('dosarCompletat111', dosarCompletat);
                setDosarCompletat(true)
            })
            .catch((error) => console.log('error', error))
    }

    const handleVerificareDosar = () => {
        navigate('/verificareDosar', { state })
    }
   
  return (
   <div className='container_all_dosar'>
    <div className='backgroundImage'/>
    <div className='container_Dosar_elements'>
        <div className='container_numeStudent'>
            <strong className='numeStudent'>Numele studentului: {state.nume} {state.prenume}</strong>
            {state?.stareDosar !== undefined ? '' : 
                state?.acteDosar ? <div onClick={() => handleVerificareDosar()} className='verificareDosarButton'>Verificare dosar</div>: '' 
             }
            
        </div>
        {!state?.acteDosar ? (
            <>
            <div className='containerInputDosar'>
                <div className='pasaport'>
                    <div className='labelPasaport'>
                        <div title="Formatul trebuie sa fie: Pasaport - 'numele si prenumele' + extensia .png">Introduceti <strong>pasaportul:</strong></div>
                        {mesajEroare?.type === "pasaport" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
                    </div>
                    <input onChange={(e) => handlePasaport(e, e.target.files)} type="file" accept="image/png" />
                </div>
                <div className='fotografii'>
                    <div className='labelFotografii'>
                        <div title="Formatul trebuie sa fie: Fotografie pasaport 'numar' - 'numele si prenumele' + extensia .png">Introduceti <strong>2 fotografii</strong> de tip pasaport: </div>
                        {mesajEroare?.type === "fotografie" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
                    </div>
                    <input onChange={(e) => handleFotografii(e, e.target.files)} type="file" accept="image/png" multiple />
                </div>
                <div className='dovadaViza'>
                    <div className='labelDovadaViza'>
                        <div title="Formatul trebuie sa fie: Taxa Viza - 'numele si prenumele' + extensia .png">Introduceti <strong>dovada</strong> achitarii taxei de viza: </div>
                        {mesajEroare?.type === "taxaViza" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
                    </div>
                    <input onChange={(e) => handleTaxaViza(e, e.target.files)} type="file" accept="image/png" />
                </div>
                <div className='dovadaAsigurareMedicala'>
                    <div className='labelDovadaAsigurareMedicala'>
                        <div title="Formatul trebuie sa fie: Asigurare medicala - 'numele si prenumele' + extensia .png">Introduceti <strong>dovada</strong> asigurarii medicale: </div>
                        {mesajEroare?.type === "asigurareMedicala" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
                    </div>
                    <input onChange={(e) => handleDovadaMedicala(e, e.target.files)} type="file" accept="image/png" />
                </div>
                <div className='dovadaFinantare'>
                    <div className='labelDovadaFinantare'>
                        <div title="Formatul trebuie sa fie: Dovada finantare - 'numele si prenumele' + extensia .png">Introduceti <strong>dovada</strong> finantarii: </div>
                        {mesajEroare?.type === "finantare" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
                    </div>
                    <input onChange={(e) => handleDovadaFinantare(e, e.target.files)} type="file" accept="image/png" />
                </div>
            </div>
            <div className='submitContainer'>
                <div className='submit' onClick={() => handleSubmit()}>Submit</div>
                {mesajEroare?.type === "submit" ? <div className='mesajEroare'>({mesajEroare.text})</div> : ''}
            </div></>
        )
    : state?.stareDosar !== undefined ? 
        state.stareDosar === false ? (
            <div className='stareDosar'>
                <div className='respins'>Dosarul dumneavoastra a fost respins!</div>
                <div>{state.mesajRespingereDosar}</div>
            </div>
            )
        : (
            <div className='stareDosar'>
                <div className='aprobat'>Dosarul dumneavoastra a fost aprobat!</div>
                <div>{state.mesajAprobareDosar}</div>
            </div>
        )
        
    : <div>Dosarul dumneavoastra a fost introdus, urmeaza sa fie <strong>validat</strong> de catre suportul administrativ.</div>
}
        
    </div>
    {dosarCompletat ? (
        <div className='containerAllMesajSubmit'>
            <div className='containerAllMesajSubmit'>
                <div>Dosarul dumneavoasta a fost introdus cu succes!</div>
                <button onClick={() => navigate('/cerere')}>OK</button>
            </div>
        </div>
    )
    : ''}
   </div>
  )
}

export default Dosar;
