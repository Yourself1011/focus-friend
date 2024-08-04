import { createContext, Dispatch, SetStateAction } from "react"

export type DataPoint = {
    timestamp: number
    value: number
    freq: number
}

export interface DataCtx {
    data: DataPoint[]
    addData: Dispatch<string>
    buffer: string
    setBuffer: Dispatch<SetStateAction<string>>
}

export const DataCtx = createContext<DataCtx>({ data: [], addData: () => { }, buffer: "", setBuffer: () => { } })