import { Environment } from "../../../environments"
import { IDetalheCidade, IListagemCidades } from "../../../interfaces"
import { AxiosConfig } from "../axios-config/AxiosConfig"

type TCidadesComTotalCount = {
    data: IListagemCidades[]
    totalCount: number
}

const getAll = async (page=1, filter="", id=""): Promise<TCidadesComTotalCount | Error> => {
    const url = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&nome_like=${filter}&id_like=${id}`
    try {
        const {data, headers} = await AxiosConfig.get<IListagemCidades[]>(url)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHA)
            }
        }

        return new Error("Erro ao listar os registros.")
        
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao listar os registros.")
    }
}

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
    try {
        const {data} = await AxiosConfig.get<IDetalheCidade>(`/cidades/${id}`)

        if(data) return data

        return new Error("Erro ao consultar o registro.")
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao consultar o registro.")
    }
}

const create = async (cidade: Omit<IDetalheCidade, "id">): Promise<number | Error> => {
    try {
        const {data} = await AxiosConfig.post<IDetalheCidade>("/cidades", cidade)

        if(data) return data.id

        return new Error("Erro ao cadastrar o registro.")
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao cadastrar o registro.")
    }
}

const updateById = async (id: number, cidade: Omit<IDetalheCidade, "id">): Promise<void | Error> => {
    try {
        await AxiosConfig.put(`/cidades/${id}`, cidade)
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao atualizar o registro.")
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await AxiosConfig.delete(`/cidades/${id}`)
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao apagar o registro.")
    }
} 


export const CidadesService = {
    getAll, getById, create, updateById, deleteById
}