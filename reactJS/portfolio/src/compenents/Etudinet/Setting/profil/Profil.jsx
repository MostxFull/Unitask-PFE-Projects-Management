import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profil() {
  const { id } = useParams();
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || `https://robohash.org/1.png?size=100x100`
  );

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState({
    name: "",
    prenom: "",
    email: "",
    classe: "",
    departement: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => {
        setUser({
          name: response.data.lastName,
          prenom: response.data.firstName,
          email: response.data.email,
          classe: response.data.classe,
          departement: response.data.departement,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      });
  }, [id]);

  useEffect(() => {
    localStorage.setItem("avatar", avatar);
  }, [avatar]);

  const handleAvatarChange = (id) => {
    const newAvatar = `https://robohash.org/${id}.png?size=100x100`;
    setAvatar(newAvatar);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Efface l'erreur quand l'utilisateur saisit un champ
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!passwords.oldPassword) newErrors.oldPassword = "L'ancien mot de passe est requis.";
    if (!passwords.newPassword) newErrors.newPassword = "Le nouveau mot de passe est requis.";
    if (!passwords.confirmPassword) newErrors.confirmPassword = "Veuillez confirmer le mot de passe.";
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/user/changePassword/${id}`, {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });

      if (response.status === 200) {
        alert("Mot de passe modifié avec succès.");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      alert(error.response?.data || "Erreur lors du changement de mot de passe.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>

      {/* Avatar */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="cursor-pointer bg-gradient-to-br from-blue-700 to-purple-700 text-white px-4 py-2 rounded-md">
            Télécharger une image
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/png, image/jpeg" />
          </label>

          <select className="border p-2 rounded-md" onChange={(e) => handleAvatarChange(e.target.value)} defaultValue="1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((id) => (
              <option key={id} value={id}>
                Avatar {id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Informations utilisateur */}
      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Nom</label>
            <input className="border p-2 rounded-md w-full" type="text" value={user.name} readOnly />
          </div>
          <div>
            <label className="text-sm font-medium">Prénom</label>
            <input className="border p-2 rounded-md w-full" type="text" value={user.prenom} readOnly />
          </div>
        </div>

        {user.departement ? (
          <div>
            <label className="text-sm font-medium">Département</label>
            <input className="border p-2 rounded-md w-full" type="text" value={user.departement} readOnly />
          </div>
        ) : (
          <div>
            <label className="text-sm font-medium">Classe</label>
            <input className="border p-2 rounded-md w-full" type="text" value={user.classe} readOnly />
          </div>
        )}

        <div>
          <label className="text-sm font-medium">Email</label>
          <input className="border p-2 rounded-md w-full" type="email" value={user.email} readOnly />
        </div>
      </form>

      {/* Changer le mot de passe */}
      <h2 className="text-lg font-bold mt-6">Changer le mot de passe</h2>
      <hr className="my-2" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.keys(passwords).map((field) => (
          <div className="relative" key={field}>
            <label className="text-sm font-medium capitalize">{field.replace("Password", " Password")}</label>
            <input
              className="border p-2 rounded-md w-full pr-10"
              type={showPasswords[field] ? "text" : "password"}
              name={field}
              value={passwords[field]}
              onChange={handlePasswordChange}
              autoComplete="off"
            />
            <button type="button" className="absolute right-3 top-9 text-gray-500" onClick={() => togglePasswordVisibility(field)}>
              {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="w-full bg-gradient-to-br from-blue-700 to-purple-700 text-white py-2 rounded-md">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

export default Profil;
