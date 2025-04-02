import { useGlobalContext } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";

const Home = () => {
    const { contacts } = useGlobalContext();

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Contact List</h2>
                <Link to="/add" className="btn btn-success">Add New Contact</Link>
            </div>
            <div className="list-group">
                {contacts.length > 0 ? (
                    contacts.map(contact => <ContactCard key={contact.id} contact={contact} />)
                ) : (
                    <p className="text-muted">No contacts available. Add a new one!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
