import { Environment } from "../../../environments"
import { IDetalhePessoa, IListagemPessoas } from "../../../interfaces"
import { AxiosConfig } from "../axios-config/AxiosConfig"

type TPessoasComTotalCount = {
    data: IListagemPessoas[]
    totalCount: number
}

const getAll = async (page=1, filter=""): Promise<TPessoasComTotalCount | Error> => {
    const url = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&nomeCompleto_like=${filter}`
    try {
        const {data, headers} = await AxiosConfig.get<IListagemPessoas[]>(url)

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

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {
        const {data} = await AxiosConfig.get<IDetalhePessoa>(`/pessoas/${id}`)

        if(data) return data

        return new Error("Erro ao consultar o registro.")
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao consultar o registro.")
    }
}

const create = async (pessoa: Omit<IDetalhePessoa, "id">): Promise<number | Error> => {
    try {
        const {data} = await AxiosConfig.post<IDetalhePessoa>("/pessoas", pessoa)

        if(data) return data.id

        return new Error("Erro ao cadastrar o registro.")
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao cadastrar o registro.")
    }
}

const updateById = async (id: number, pessoa: Omit<IDetalhePessoa, "id">): Promise<void | Error> => {
    try {
        await AxiosConfig.put(`/pessoas/${id}`, pessoa)
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao atualizar o registro.")
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await AxiosConfig.delete(`/pessoas/${id}`)
    } catch (error) {
        return new Error((error as {message: string}).message || "Erro ao apagar o registro.")
    }
} 


export const PessoasService = {
    getAll, getById, create, updateById, deleteById
}