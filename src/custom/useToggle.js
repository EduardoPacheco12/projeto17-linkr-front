import { useState, useCallback } from "react";

export function useToggle() {
    const [enable, setEnable] = useState(false);

    const toggle = useCallback(() => setEnable(!enable), []);

    return [enable, toggle]
}