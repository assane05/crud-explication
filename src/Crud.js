import React, { useEffect, useState } from "react";
import { fireDb } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function FirebaseFirestore() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);

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
  //  fonctino pour la suppression
  const handleDelete = async (id) => {
    const deleteVal = doc(fireDb, "demo", id);
    await deleteDoc(deleteVal);
  };

  //   fonction pour la modification
  const handleEdit = async (id, name1, name2) => {
    setFname(name1);
    setLname(name2);
    setId(id);
    setShow(true);
  };

  //   mise à jour
  const handleUpdate = async () => {
    const updateData = doc(fireDb, "demo", id);
    await updateDoc(updateData, { name1: fname, name2: lname });
    setShow(false);
    setFname("");
    setLname("");
  };

  return (
    <div className="container">
      <input value={fname} onChange={(e) => setFname(e.target.value)} />
      <input value={lname} onChange={(e) => setLname(e.target.value)} />
      {!show ? (
        <button onClick={handleCreate}>Create</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}
      {val.map((values) => (
        <div>
          <table>
            <tr>
              <td>{values.name1}</td>
              <td>{values.name2}</td>
              <td>
                <button onClick={() => handleDelete(values.id)}>Delete</button>
              </td>
              <td>
                <button
                  onClick={() =>
                    handleEdit(values.id, values.name1, values.name2)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
}
export default FirebaseFirestore;
