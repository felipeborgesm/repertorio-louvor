import { collection, getDocs } from "firebase/firestore"
import { collectionName, db } from '../firebaseConfig'
import type MusicData from '@/model/MusicData'

export async function getMusicData(): Promise<MusicData[]> {
    const musicCollection = collection(db, collectionName)
    const musicSnapShot = await getDocs(musicCollection)

    const musicData = musicSnapShot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as MusicData
    })

    const musicList = musicData.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    })

    return musicList

}