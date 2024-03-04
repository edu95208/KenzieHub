import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useContextIm } from "../hooks/useContext";
import { toast } from "react-toastify";

export const Techcontext = createContext({});

export const TechProvider = ({ children }) => {
    const { TecList, setTecList } = useContextIm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isModalEdit, setisModalEdit] = useState(false);
    const [editingTech, setEditingTech] = useState(false);
   


    const createTech = async (newTech) => {
        try {
            const token = localStorage.getItem("@TOKEN");


            const { data } = await api.post("/users/techs", newTech, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Curso adicionado com sucesso!")
            setTecList([...TecList, data]);
        } catch (error) {
          console.error(error);
        }
    }


    const deleteTech = async (deletingId) => {
        try {
            const token = localStorage.getItem("@TOKEN")

            await api.delete(`/users/techs/${deletingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const newTechList = TecList.filter((tech) => tech.id !== deletingId)
            setTecList(newTechList)
            toast.success("Curso excluido com sucesso!")
        } catch (error) {
         console.error(error);
        }
    }

    const techUpdate = async (formData) => {
     
        try {
            const token = localStorage.getItem("@TOKEN")

            const { data } = await api.put(`/users/techs/${editingTech.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const editTechList = TecList.map((tech) => {
                if (tech.id === editingTech.id) {
                    return data
                } else {
                    return tech
                }
            })
            setTecList(editTechList);
            setisModalEdit(false);
        } catch (error) {
          console.error(error)
          
        }
    }
  
    return (
        <Techcontext.Provider
            value={{
                editingTech,
                setEditingTech,
                techUpdate,
                isModalEdit,
                setisModalEdit,
                deleteTech,
                isModalVisible,
                setIsModalVisible,
                TecList,
                createTech
            }}>
            {children}
        </Techcontext.Provider>
    )
}