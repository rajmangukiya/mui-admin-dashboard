import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid";

export const uploadFile = async (images) => {
    try {
        const URLs = await Promise.all(images.map(async image => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef)
            console.log('firebase images', url);
            return url;
        }))

        return URLs;

    } catch (error) {
        throw new Error("Error in image uploading")
    }
}