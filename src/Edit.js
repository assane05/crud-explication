import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fireDb } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Edit() {
  const { id } = useParams();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(fireDb, "demo", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFname(data.name1);
        setLname(data.name2);
      } else {
        console.log("il n'y a pas de document à afficher !");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    const docRef = doc(fireDb, "demo", id);
    await updateDoc(docRef, { name1: fname, name2: lname });
    setFname("");
    setLname("");
  };

  return (
    <div className="container">
      <input value={fname} onChange={(e) => setFname(e.target.value)} />
      <input value={lname} onChange={(e) => setLname(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
      <Link to="/">Voir la liste</Link>
    </div>
  );
}

export default Edit;
