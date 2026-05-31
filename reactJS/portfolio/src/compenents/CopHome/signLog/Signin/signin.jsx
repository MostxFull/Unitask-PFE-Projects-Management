import { useState } from 'react';
import axios from "axios";

function Signin({ onSuccess }) {
    const [role, setRole] = useState('etudient');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        classe: '',
        departement: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function handleRoleChange(event) {
        const newRole = event.target.value;
        setRole(newRole);
        setFormData({
            ...formData,
            departement: '',
            classe: ''
        });
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function validateForm() {
        let newErrors = {};
        if (!formData.lastName) newErrors.lastName = '*Nom est requis';
        if (!formData.firstName) newErrors.firstName = '*Prénom est requis';
        if (!formData.email) newErrors.email = '*Email est requis';
        if (!formData.password) newErrors.password = '*Mot de passe requis';
        if (role === 'enseignant' && !formData.departement) newErrors.departement = '*Département requis';
        if (role === 'etudient' && !formData.classe) newErrors.classe = '*Classe requise';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const requestData = role === 'enseignant' ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            departement: formData.departement
        } : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            classe: formData.classe,
            isAdmin: "Non",
            groupId: null
        };

        const url = role === 'enseignant'
            ? 'http://localhost:8080/user/addEnseignant'
            : 'http://localhost:8080/user/saveEtu';

        axios.post(url, requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status === 201) {
                    onSuccess(response.data); // Appeler la fonction de succès avec les données du nouvel étudiant
                }
            })
            .catch(error => {
                console.error('Erreur:', error.response?.data);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <h1 className='text-2xl text-center mb-4 font-bold italic'>Ajouter un utilisateur</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <label className='block mb-1'>Prénom</label>
                        <input
                            className='w-full border rounded-md p-2'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
                    </div>
                    <div className='flex-1'>
                        <label className='block mb-1'>Nom</label>
                        <input
                            className='w-full border rounded-md p-2'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
                    </div>
                </div>

                <div>
                    <label className='block mb-1'>Rôle</label>
                    <select
                        className='w-full border p-2 rounded-md'
                        value={role}
                        onChange={handleRoleChange}
                    >
                        <option value='etudient'>Étudiant</option>
                        <option value='enseignant'>Enseignant</option>
                    </select>
                </div>

                {role === 'enseignant' && (
                    <div>
                        <label className='block mb-1'>Département</label>
                        <input
                            className='w-full border rounded-md p-2'
                            name='departement'
                            value={formData.departement}
                            onChange={handleChange}
                        />
                        {errors.departement && <p className='text-red-500 text-sm'>{errors.departement}</p>}
                    </div>
                )}

                {role === 'etudient' && (
                    <div>
                        <label className='block mb-1'>Classe</label>
                        <input
                            className='w-full border rounded-md p-2'
                            name='classe'
                            value={formData.classe}
                            onChange={handleChange}
                        />
                        {errors.classe && <p className='text-red-500 text-sm'>{errors.classe}</p>}
                    </div>
                )}

                <div>
                    <label className='block mb-1'>Email</label>
                    <input
                        className='w-full border rounded-md p-2'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                </div>

                <div>
                    <label className='block mb-1'>Mot de passe</label>
                    <input
                        className='w-full border rounded-md p-2'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                </div>

                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'
                    disabled={loading}
                >
                    {loading ? 'Envoi en cours...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}

export default Signin;

// import  { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
//
// function Signin() {
//     const navigate = useNavigate();
//     const [role, setRole] = useState('etudient');
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         classe: '',
//         departement: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//
//     function handleRoleChange(event) {
//         const newRole = event.target.value;
//         setRole(newRole);
//         setFormData({
//             ...formData,
//             departement: '',
//             classe: ''
//         });
//     }
//
//     function handleChange(event) {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value
//         });
//     }
//
//     function validateForm() {
//         let newErrors = {};
//         if (!formData.lastName) newErrors.lastName = '*Nom est requis';
//         if (!formData.firstName) newErrors.firstName = '*Prénom est requis';
//         if (!formData.email) newErrors.email = '*Email est requis';
//         if (!formData.password) newErrors.password = '*Mot de passe requis';
//         if (role === 'enseignant' && !formData.departement) newErrors.departement = '*Département requis';
//         if (role === 'etudient' && !formData.classe) newErrors.classe = '*Classe requise';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     }
//
//     function handleSubmit(event) {
//         event.preventDefault();
//         if (!validateForm()) return;
//
//         setLoading(true);
//
//         // Formatage des données selon le rôle
//         const requestData = role === 'enseignant' ? {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             password: formData.password,
//             departement: formData.departement
//         } : {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             password: formData.password,
//             classe: formData.classe,
//             isAdmin: "Non",
//             groupId: null
//         };
//
//         const url = role === 'enseignant'
//             ? 'http://localhost:8080/user/addEnseignant'
//             : 'http://localhost:8080/user/saveEtu';
//
//         axios.post(url, requestData, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(response => {
//                 if (response.status === 201) {
//                     navigate("/Login");
//                 }
//             })
//             .catch(error => {
//                 console.error('Erreur:', error.response?.data);
//             })
//             .finally(() => setLoading(false));
//     }
//
//     return (
//         <div className='h-screen flex justify-center items-center'>
//             <div className='border p-5 rounded-md border-black w-96'>
//                 <h1 className='text-3xl text-center mb-4 font-bold italic'>Inscription</h1>
//                 <form onSubmit={handleSubmit} className='space-y-4'>
//                     <div className='flex gap-4'>
//                         <div className='flex-1'>
//                             <label className='block mb-1'>Prénom</label>
//                             <input
//                                 className='w-full border rounded-md p-2'
//                                 name='firstName'
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                             />
//                             {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
//                         </div>
//
//                         <div className='flex-1'>
//                             <label className='block mb-1'>Nom</label>
//                             <input
//                                 className='w-full border rounded-md p-2'
//                                 name='lastName'
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                             />
//                             {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
//                         </div>
//                     </div>
//
//                     <div>
//                         <label className='block mb-1'>Rôle</label>
//                         <select
//                             className='w-full border p-2 rounded-md'
//                             value={role}
//                             onChange={handleRoleChange}
//                         >
//                             <option value='etudient'>Étudiant</option>
//                             <option value='enseignant'>Enseignant</option>
//                         </select>
//                     </div>
//
//                     {role === 'enseignant' && (
//                         <div>
//                             <label className='block mb-1'>Département</label>
//                             <input
//                                 className='w-full border rounded-md p-2'
//                                 name='departement'
//                                 value={formData.departement}
//                                 onChange={handleChange}
//                             />
//                             {errors.departement && <p className='text-red-500 text-sm'>{errors.departement}</p>}
//                         </div>
//                     )}
//
//                     {role === 'etudient' && (
//                         <div>
//                             <label className='block mb-1'>Classe</label>
//                             <input
//                                 className='w-full border rounded-md p-2'
//                                 name='classe'
//                                 value={formData.classe}
//                                 onChange={handleChange}
//                             />
//                             {errors.classe && <p className='text-red-500 text-sm'>{errors.classe}</p>}
//                         </div>
//                     )}
//
//                     <div>
//                         <label className='block mb-1'>Email</label>
//                         <input
//                             className='w-full border rounded-md p-2'
//                             type='email'
//                             name='email'
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
//                     </div>
//
//                     <div>
//                         <label className='block mb-1'>Mot de passe</label>
//                         <input
//                             className='w-full border rounded-md p-2'
//                             type='password'
//                             name='password'
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                         {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
//                     </div>
//
//                     <button
//                         type='submit'
//                         className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'
//                         disabled={loading}
//                     >
//                         {loading ? 'Envoi en cours...' : 'S\'inscrire'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default Signin;