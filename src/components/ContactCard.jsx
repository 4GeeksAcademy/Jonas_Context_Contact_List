import { useGlobalContext } from "../hooks/useGlobalReducer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteModal from "./DeleteModal";

const ContactCard = ({ contact }) => {
    const { deleteContact } = useGlobalContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = () => {
        setIsVisible(false);
        setTimeout(() => deleteContact(contact.id), 300);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="list-group-item d-flex justify-content-between align-items-center"
                    initial={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="d-flex align-items-center">
                        <img src="https://via.placeholder.com/50" alt="Avatar" className="rounded-circle me-3" />
                        <div>
                            <h5 className="mb-1">{contact.full_name}</h5>
                            <p className="mb-0"><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
                            <p className="mb-0"><i className="fas fa-phone"></i> {contact.phone}</p>
                            <p className="mb-0"><i className="fas fa-envelope"></i> {contact.email}</p>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-sm btn-outline-primary me-2">
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setIsModalOpen(true)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDelete} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactCard;
