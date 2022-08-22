import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Association(props) {
    const { slug } = useParams();
    const [association, setAssociation] = useState(null);

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

    if (!association) {
        return <h1>Loading</h1>;
    }
    return (
        <>
            <header className="text-center">
                <h1>{association.name}</h1>
            </header>
            <main className="container">
                <img
                    src={association.image}
                    alt={association.name}
                    style={{ width: "50%" }}
                />
                <h2>{association.slogan}</h2>
                <p>{association.description}</p>
            </main>
        </>
    );
}

export default Association;
