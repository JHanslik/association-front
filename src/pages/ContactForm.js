import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function ContactForm(props) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [association, setAssociation] = useState([]);

    useEffect(() => {
        fetchAssociation();
    }, []);

    const fetchAssociation = async () => {
        const request = await fetch(
            `http://localhost:5000/associations/${slug}`
        );
        const response = await request.json();

        setAssociation(response);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageSent = {
            association: association.name,
            name: name,
            message: message,
        };

        const request = await fetch(
            `http://localhost:5000/associations/${slug}/contact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageSent),
            }
        );

        const response = await request.json();

        if (request.status === 201) {
            navigate(`../${slug}`);
        } else {
            console.log(response);
        }
    };
    console.log(association);
    return (
        <>
            <Header />
            <main className="container py-3">
                <h2 className="text-center">Message to «{association.name}»</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">
                            Firstname Lastname
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameInput"
                            placeholder="Type here ..."
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="messageInput" className="form-label">
                            What do you want to tell us ?
                        </label>
                        <textarea
                            className="form-control"
                            placeholder="Type here ..."
                            id="messageInput"
                            rows="8"
                            onChange={handleMessageChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </main>
        </>
    );
}

export default ContactForm;
