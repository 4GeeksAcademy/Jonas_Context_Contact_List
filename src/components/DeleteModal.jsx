import { motion } from "framer-motion";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <motion.div 
                className="modal-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <h4>Are you sure?</h4>
                <p>This action cannot be undone.</p>
                <div className="modal-buttons">
                    <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteModal;
