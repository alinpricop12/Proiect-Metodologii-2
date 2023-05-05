import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


function Cerere() {
    const navigate = useNavigate();
    const [cereri, setCereri] = useState([]);
    const [facultati, setFacultati] = useState([]); 
    const [currentTab, setCurrentTab] = useState('cereriNeevaluate');
    const [selectedCerere, setSelectedCerere] = useState(null);
    console.log('cereri', cereri.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)));
    const [mesajVeridicitate, setMesajVeridicitate] = useState({});
    const [mesajApertenenta, setMesajApertenenta] = useState({});
  
    const handleTab = (type) => {
      setCurrentTab(type);
    }
    const handleSelectCerere = (cerere = null) => {
      if (cerere === null) {
        setSelectedCerere(null); 
        setMesajVeridicitate({});
        setMesajApertenenta({});
        setCurrentTab('cereriNeevaluate')
        return '';
      }
      setSelectedCerere({
        id: cerere._id,
        nume: cerere.nume,
        prenume: cerere.prenume,
        email: cerere.email,
        telefon: cerere.telefon,
        universitate: cerere.universitate,
        facultate: cerere.facultate,
        studiuUniversitar: cerere.studiuUniversitar,
        anStudiu: cerere.anDeStudiu,
        stareCerere: cerere.statusCerere,
      })
    }

    const handleActionButton =  (type) => {
      axios.put('http://localhost:3001/modificareCerere', {id: selectedCerere.id, statusCerere: type})
        .then(() => {
          console.log('aici', type);
          setCurrentTab('cereriEvaluate');
          setSelectedCerere(null);
          setMesajVeridicitate({});
          setMesajApertenenta({});
        }).catch((error) => console.log('eroarea este', error));
    }

    const handleVeridicitate = () => {
      let flag = 1;
      const mesaj = {
        text: '',
        veridicitate: true,
      }
      let mesajString = 'Nu exista: ';

      const verificareUniversitate = facultati.find((element) => (element.denumire_universitate === selectedCerere.universitate) || (element.cod_universitate === selectedCerere.universitate));
      if (!verificareUniversitate) {
        mesajString = mesajString + `universitatea ${selectedCerere.universitate},`;
        flag = 0;
      }

      const verificareFacultate = facultati.find((element) => (element.nume === selectedCerere.facultate) || (element.cod === selectedCerere.facultate));
      if (!verificareFacultate) {
        mesajString = mesajString + ` facultatea ${selectedCerere.facultate},`;
        flag = 0;
      }

      const verificareStudiuUniversitar = facultati.find((element) => {
        let flag = 0;
        for (const key in element) {
          console.log('key', key, 'selectedCerere.studiuUniversitar.toLowerCase()', selectedCerere.studiuUniversitar.toLowerCase());
          if (key === selectedCerere.studiuUniversitar.toLowerCase()) {
            flag = 1;
          }
        }
        if (flag === 1) {
          return element;
        } else return undefined;
      });
      if (!verificareStudiuUniversitar) {
        mesajString = mesajString + ` studiul universitar ${selectedCerere.studiuUniversitar},`;
        flag = 0;
      }

      const verificareAnDeStudiu = facultati.find((element) => {
        let flag = 0;
        for (const key in element) {
          if (key === selectedCerere.studiuUniversitar.toLowerCase()) {
            console.log('selectedCerere.anStudiu', selectedCerere.anStudiu, 'selectedCerere.studiuUniversitar.toLowerCase()', selectedCerere.studiuUniversitar.toLowerCase(), 'facultati[key]', facultati[key]);
            if (selectedCerere.anStudiu * 1 <= element[key] * 1) {
              flag = 1;
            }
          }
        }
        if (flag === 1) {
          return element;
        } else return undefined;
      });
      if (!verificareAnDeStudiu) {
        mesajString = mesajString + ` anul de studiu ${selectedCerere.anStudiu} la studiul de invatamant ${selectedCerere.studiuUniversitar}`;
        flag = 0;
      }

      if (flag === 0) {
        mesaj.text = mesajString;
        mesaj.veridicitate = false;
      } else if (flag === 1) {
        mesaj.text = 'Datele introduse de student sunt corecte!';
      }

      setMesajVeridicitate(mesaj);
    }

    const handleApertenenta = () => {
      let randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0) {
        setMesajApertenenta({
          apartenenta: 0,
          text: 'Studentul NU este inrolat in institutiile de invatamant mentionate!'
        })
      }
      if (randomNumber === 1) {
        setMesajApertenenta({
          apartenenta: 1,
          text: 'Studentul este inrolat in institutiile de invatamant mentionate!'
        })
      }
    }

    const handleDosar = (cerere) => {
      navigate('/dosar', { state: cerere})
    }

  useEffect(() => {
    axios.get('http://localhost:3001/cereriStudenti')
        .then(({data}) => {console.log('data este', data); setCereri(data.filter((element) => {
          if (currentTab === 'cereriNeevaluate') {
            return element.statusCerere === 'In Asteptare';
          }
          if (currentTab === 'cereriEvaluate') {
            return element.statusCerere !== 'In Asteptare';
          }
        }).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)))})
        .catch((error) => console.log(error));

    axios.get('http://localhost:3001/facultati')
        .then(({data}) => setFacultati(data))
        .catch((error) => console.log(error));
  }, [currentTab, selectedCerere, mesajVeridicitate, mesajVeridicitate, mesajApertenenta]);


  return (
   <div className='container_all_cerere'>
    <div className='backgroundImage'/>
    <div className='container_Cerere_elements'>
      <div className='header'><strong>{selectedCerere ? `Cererea candidatului cu numele: ${selectedCerere.nume} ${selectedCerere.prenume}` : "Lista de cereri" }</strong></div>
      {!selectedCerere ? (
        <>
          <div className='containerTipuriCerere'>
            <div onClick={() => handleTab('cereriNeevaluate')} style={{backgroundColor: currentTab === "cereriNeevaluate" && 'rgb(118, 186, 245)'}}>Cereri neevaluate</div>
            <div onClick={() => handleTab('cereriEvaluate')} style={{backgroundColor: currentTab === "cereriEvaluate" && 'rgb(118, 186, 245)'}}>Cereri evaluate</div>
          </div>
          <div className='containerTabelCereri'>
            <div className='tabelHeaderContainer'>
              <div className='nume'>Nume</div>
              <div className='prenume'>Prenume</div>
              <div className='email'>Email</div>
              <div className='telefon'>Telefon</div>
              <div className='universitate'>Universitate</div>
              <div className='facultate'>Facultate</div>
              <div className='studiuUniversitar'>Studiu universitar</div>
              <div className='anStudiu'>An de studiu</div>
              <div className='stareCerere'>Stare cerere</div>
            </div>
            <div className='tabelCereriContainer'>
              {
              cereri.map((cerere) => {
                return ( 
                  <div 
                    className='cerereContainer'
                    onClick={() => { 
                      if (currentTab === 'cereriNeevaluate') {
                        handleSelectCerere(cerere)
                      }
                      if (currentTab === 'cereriEvaluate' && cerere.statusCerere === "Acceptata") {
                        handleDosar(cerere);
                      }
                      }}
                  >
                      <div className='nume'>{cerere.nume}</div>
                      <div className='prenume'>{cerere.prenume}</div>
                      <div className='email'>{cerere.email}</div>
                      <div className='telefon'>{cerere.telefon}</div>
                      <div className='universitate'>{cerere.universitate}</div>
                      <div className='facultate'>{cerere.facultate}</div>
                      <div className='studiuUniversitar'>{cerere.studiuUniversitar}</div>
                      <div className='anStudiu'>{cerere.anDeStudiu}</div>
                      <div className='stareCerere' onClick={() => console.log('test123213')}>{cerere.statusCerere}</div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </>
      )
      : (
        <div className='containerCerereSelectata'> 
          <button onClick={() => handleSelectCerere()}>Inapoi</button>
          <div className='cerereSelectata'> 
            <div className='nume'>
              <div className='columnName'>Nume</div>
              <div className='columnValue'>{selectedCerere.nume}</div>
            </div>
            <div className='prenume'>
              <div className='columnName'>Prenume</div>
              <div className='columnValue'>{selectedCerere.prenume}</div>
            </div>
            <div className='email'>
              <div className='columnName'>Email</div>
              <div className='columnValue'>{selectedCerere.email}</div>
            </div>
            <div className='telefon'>
              <div className='columnName'>Telefon</div>
              <div className='columnValue'>{selectedCerere.telefon}</div>
            </div>
            <div className='universitate'>
              <div className='columnName'>Universitate</div>
              <div className='columnValue'>{selectedCerere.universitate}</div>   
            </div>
            <div className='facultate'>
              <div className='columnName'>Facultate</div>
              <div className='columnValue'>{selectedCerere.facultate}</div>
            </div>
            <div className='studiuUniversitar'>
              <div className='columnName'>Studiu universitar</div>
              <div className='columnValue'>{selectedCerere.studiuUniversitar}</div>
            </div>
            <div className='anStudiu'>
              <div className='columnName'>An de studiu</div>
              <div className='columnValue'>{selectedCerere.anStudiu}</div>
            </div>
            <div className='stareCerere'>
              <div className='columnName'>Stare cerere</div>
              <div className='columnValue'>{selectedCerere.stareCerere}</div>
            </div>
          </div>
          <div className='containerButoaneVerificare'>
            <div>
              <button onClick={() => handleVeridicitate()}>Verificarea veridicitatii datelor</button>
            </div>
            <div>
              <button onClick={() => {if (Object.keys(mesajApertenenta).length === 0) handleApertenenta()}} style={{opacity: mesajVeridicitate?.veridicitate ? 1 : 0.5, pointerEvents: mesajVeridicitate?.veridicitate ? "auto" : "none"}}>Verificarea apartenentei studentului</button>
            </div>
          </div>
          <div className='mesajeContainer'> 
            <div style={{display: Object.keys(mesajVeridicitate).length != 0 ? 'block' : 'none'}} className='mesajVeridicitate'>Mesaj pentru <span style={{fontWeight: 600}}>"Verificarea veridicitatii datelor"</span> : <span style={{color: mesajVeridicitate?.veridicitate === true ? "blue" : "red", fontWeight: 600}}>{mesajVeridicitate.text}</span></div>
            <div style={{display: Object.keys(mesajApertenenta).length != 0 ? 'block' : 'none'}} className='mesajApartenenta'>Mesaj pentru <span style={{fontWeight: 600}}>"Verificarea apartenentei studentului"</span> : <span style={{color: mesajApertenenta?.apartenenta === 1 ? "blue" : "red", fontWeight: 600}}>{mesajApertenenta.text}</span> </div>
          </div>
          <div className='containerButoaneEvaluare'>
            <button onClick={() => handleActionButton('Respinsa')} style={{display: Object.keys(mesajVeridicitate).length === 0 ? 'none' : ((mesajVeridicitate?.veridicitate !== true && mesajApertenenta?.apartenenta !== 1) || (Object.keys(mesajApertenenta).length !== 0 && mesajApertenenta?.apartenenta !== 1) ? 'block' : 'none')}} className='butonRespingere'> Respinge cererea </button>
            <button onClick={() => handleActionButton('Acceptata')} style={{display: mesajVeridicitate?.veridicitate === true && mesajApertenenta?.apartenenta === 1 ? 'block' : 'none'}} className='butonAprobare'> Aproba cererea </button>
          </div>
        </div>
      )
    }
    </div>
   </div>
  )
}

export default Cerere;
