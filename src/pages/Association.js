import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Header from "../components/Header";
function Association(props) {
    const { slug } = useParams();
    const [association, setAssociation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchAssociation();
        fetchMessages();
    }, []);

    const fetchAssociation = async () => {
        const request = await fetch(
            `http://localhost:5000/associations/${slug}`
        );
        const response = await request.json();

        setAssociation(response);
    };

    const fetchMessages = async () => {
        const request = await fetch(
            `http://localhost:5000/associations/${slug}/messages`
        );
        const response = await request.json();

        setMessages(response);
    };

    if (!association) {
        return <h1>Loading</h1>;
    }
    return (
        <>
            <Header />
            <main className="container">
                <section className="d-flex flex-column align-items-center text-center">
                    <img
                        className="col-10 col-md-6"
                        src={association.image}
                        alt={association.name}
                    />
                    <h2>{association.slogan}</h2>
                    <p>{association.description}</p>
                </section>
                <section className="d-flex flex-column align-items-center my-5">
                    <Link to={`/${association.slug}/contact`}>
                        <button className="btn btn-primary my-3">
                            Envoyer un message à l'association
                        </button>
                    </Link>
                    <h2 className="my-3">Messages sent :</h2>
                    {messages.map((message) => {
                        return (
                            <article
                                key={message.name}
                                className="my-3 col-10 text-center"
                            >
                                <h3>Sent by : {message.name}</h3>
                                <p>On : {moment(message.time).format("LLL")}</p>
                                <p>{message.message}</p>
                            </article>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

export default Association;
