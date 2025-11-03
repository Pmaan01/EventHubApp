import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const eventsCol = collection(db, "events");


export async function uploadImage(file, path = `events/${Date.now()}_${file.name}`) {
  if (!file) return null;
  const ref = storageRef(storage, path);
  const snapshot = await uploadBytes(ref, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

export async function createEvent(data, imageFile = null) {
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
  };

  if (imageFile) {
    try {
      const url = await uploadImage(imageFile);
      payload.imageUrl = url;
    } catch (err) {
      throw new Error("Image upload failed: " + err.message);
    }
  }

  const docRef = await addDoc(eventsCol, payload);
  return docRef.id;
}
