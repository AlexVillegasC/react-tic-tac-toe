import { useEffect, useState } from "react"
import { getCatImage } from "../services/loadImages"

export function useCatImage ({ fact }) {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if(!fact) return
        getCatImage(fact).then(url => setImageUrl(url))
    },[fact])

    return imageUrl
}