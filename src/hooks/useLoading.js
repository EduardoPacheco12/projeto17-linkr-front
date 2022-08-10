import { useState, useEffect } from "react";

export function useLoading() {
    const [enable, setEnable] = useState(false);

    useEffect(() => setTimeout(1000, () => setEnable(true)), [])

    return [enable, setEnable]
}