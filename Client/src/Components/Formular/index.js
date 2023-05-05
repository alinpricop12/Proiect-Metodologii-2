import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import './style.css';

function Formular() {
    const formRef = useRef(null);
    const proprietatiFormular = useRef({stareCerere:'neverificata'});
    const [formularCompletat, setFormularCompletat] = useState(false);
    const handleProperty = (e, type) => {
        console.log('e este', e);
        proprietatiFormular.current[type] = e.target.value;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        proprietatiFormular.current.statusCerere = "In Asteptare";
        console.log('proprietatiFormular', proprietatiFormular.current);
        axios.post('http://localhost:3001/inregistrareStudent', proprietatiFormular.current).then(({data}) => console.log('data este', data)).catch((error) => console.log(error));
        formRef.current.reset();
        setFormularCompletat(true);
    }
    const handleOk = () => {
        setFormularCompletat(false);
    }
    
  return (
    <div className='container_all_Formular'>
        <div className='backgroundImage'/>
        {formularCompletat && (
            <div className='containerAllMesajSubmit'>
                <div className='containerAllMesajSubmit'>
                    <div>Formular completat cu succes!</div>
                    <button onClick={handleOk}>OK</button>
                </div>
            </div>
        )
        }
        
        <div className='container_Formular_elements'>
            <div className='header'><strong>Formular inscriere Work&Travel</strong></div>
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className='nume_container'>
                    <label htmlFor='numeStudent'>Nume: </label>
                    <input pattern='[a-zA-Z\s]+' type='text' id='numeStudent' required onChange={(e) => handleProperty(e, 'nume')}></input>
                </div> 
                <div className='prenume_container'>
                    <label htmlFor='prenumeStudent'>Prenume: </label>
                    <input pattern='[a-zA-Z\s]+' type='text' id='prenumeStudent' required onChange={(e) => handleProperty(e, 'prenume')}></input>
                </div>
                <div className='email_container'>
                    <label htmlFor='emailStudent'>Adresa de Email: </label>
                    <input type='email' id='emailStudent' required onChange={(e) => handleProperty(e, 'email')}></input>
                </div>
                <div className='telefon_container'>
                    <label htmlFor='telefonStudent'>Numar de telefon: </label>
                    <input 
                        type='tel' 
                        id='telefonStudent' 
                        required
                        pattern='^(\+4|0)?(2[2-9]|3[2-9]|7[2-9]|8[0-9])[0-9]{7}$'
                        onChange={(e) => handleProperty(e, 'telefon')}
                    >
                    </input>
                </div>
                <div className='universitate_container'>
                    <label htmlFor='universitateStudent'>Universitate: </label>
                    <input 
                        type='text' 
                        id='universitateStudent' 
                        required
                        pattern='[a-zA-Z\s]+'
                        onChange={(e) => handleProperty(e, 'universitate')}
                    >
                    </input>
                </div>
                <div className='facultate_container'>
                    <label htmlFor='facultateStudent'>Facultate: </label>
                    <input type='text' id='facultateStudent' required onChange={(e) => handleProperty(e, 'facultate')}></input>
                </div>
                <div className='studiuUniversitar_container'>
                    <label htmlFor='studiuUniversitarStudent'>Studiu universitar: </label>
                    <input type='text' id='studiuUniversitarStudent' required onChange={(e) => handleProperty(e, 'studiuUniversitar')}></input>
                </div>
                <div className='anDeStudiu_container'>
                    <label htmlFor='anDeStudiuStudent'>An de studiu: </label>
                    <input type='number' id='anDeStudiuStudent' required onChange={(e) => handleProperty(e, 'anDeStudiu')}></input>
                </div>
                <input className='submitButton' type="submit" value="SUBMIT" />
            </form>
        </div>
    </div>
  )

}

export default Formular;
