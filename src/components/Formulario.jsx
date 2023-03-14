import { useEffect, useState } from "react"
import FormError from './FormError';
const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) =>
{
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [alta, setAlta] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [error, setError] = useState(false)


    useEffect(() =>
    {
        if (Object.keys(paciente).length > 0)
        {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () =>
    {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(35);

        return random + fecha
    }
    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if ([nombre, propietario, email, alta, sintomas].includes(''))
        {
            setError(true);
            return;
        }
        setError(false);

        const Objpaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }
        if (paciente.id)
        {
            //Edicion registro
            Objpaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? Objpaciente : pacienteState);
            setPacientes(pacientesActualizados);
            setPaciente({});
        } else
        {
            Objpaciente.id = generarId();
            setPacientes([...pacientes, Objpaciente]);
        }


        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');

    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-3">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Agregar Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                id="formularioPacientes"
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error &&
                    <FormError><p>Todos los campos son obligatorios</p></FormError>
                }
                <div className="mb-5">
                    <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        id="nombre"
                        name="nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type='text'
                        placeholder="Nombre de la mascota"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input
                        id="propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type='text'
                        placeholder="Nombre del propietario"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type='email'
                        placeholder="Email contacto"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                    <input
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type='date'
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-opacity"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
                />
            </form>

        </div>
    )
}

export default Formulario