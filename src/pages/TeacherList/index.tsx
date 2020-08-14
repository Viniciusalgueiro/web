import React, { useState, FormEvent } from 'react';
import PageHeader from '../../componentes/PageHeader'
import TeacherItem, {Teacher} from '../../componentes/TeacherItem';
import Input from '../../componentes/Input';

import './styles.css';
import Select from '../../componentes/Select';
import api from '../../services/api';



  
function TeacherList(){
    const[teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
    
        const response = await api.get("classes", {
          params: {
            subject,
            week_day,
            time,
          },
        });
        setTeachers(response.data);
      }

    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Materia"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value) }}
                        options={[
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Português", label: "Português" },
                            { value: "Matemática", label: "Matemática" },
                            { value: "Geografia", label: "Geografia" },
                            { value: "Física", label: "Física" },
                        ]}
                    />

                    <Select 
                        name="Week_day" 
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value) }}
                        options={[
                            { value: "0", label: "Domingo" },
                            { value: "1", label: "Segunda" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                            { value: "6", label: "Sábado" },
                        ]}
                    />
                    <Input 
                        type="time"
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type='submit'>
                        Buscar
                    </button>
                </form>
            </PageHeader>
            
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher ={teacher} />;
                })}
            </main>
        </div>
    )
}


export default TeacherList;