import { useGlobalContext } from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
    const { contacts, addContact, updateContact } = useGlobalContext();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const isEditing = Boolean(id);
    const existingContact = isEditing ? contacts.find(c => c.id === parseInt(id)) : null;

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (existingContact) {
            setFormData(existingContact);
        }
    }, [existingContact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateContact({ ...formData, id: parseInt(id) });
        } else {
            addContact(formData);
        }
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>{isEditing ? "Edit Contact" : "Add New Contact"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
};

export default AddContact;
