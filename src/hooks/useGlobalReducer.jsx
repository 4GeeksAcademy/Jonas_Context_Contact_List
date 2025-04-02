import { createContext, useReducer, useContext, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/contact/";

const GlobalContext = createContext();

const initialState = {
    contacts: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CONTACTS":
            return { ...state, contacts: action.payload };
        case "ADD_CONTACT":
            return { ...state, contacts: [...state.contacts, action.payload] };
        case "UPDATE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };
        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
            };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            dispatch({ type: "SET_CONTACTS", payload: data });
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const addContact = async (contact) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact),
            });
            const newContact = await response.json();
            dispatch({ type: "ADD_CONTACT", payload: newContact });
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const updateContact = async (id, updatedContact) => {
        try {
            await fetch(`${API_URL}${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedContact),
            });
            dispatch({ type: "UPDATE_CONTACT", payload: { id, ...updatedContact } });
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await fetch(`${API_URL}${id}`, { method: "DELETE" });
            dispatch({ type: "DELETE_CONTACT", payload: id });
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <GlobalContext.Provider value={{ ...state, addContact, updateContact, deleteContact }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
