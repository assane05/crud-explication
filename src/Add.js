import React, { useEffect, useState } from "react";
import { fireDb } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function FirebaseFirestore() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");

  const [val, setVal] = useState([]);

  const value = collection(fireDb, "demo");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  //   c'est l'ajout de user
  const handleCreate = async () => {
    await addDoc(value, { name1: fname, name2: lname });
    setFname("");
    setLname("");
  };

  return (
    <div className="container">
      <input value={fname} onChange={(e) => setFname(e.target.value)} />
      <input value={lname} onChange={(e) => setLname(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
      <Link to="/">
        <button>Voir la liste</button>
      </Link>
    </div>
  );
}
export default FirebaseFirestore;
