import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(props) {
    const [associations, setAssociations] = useState([]);

    useEffect(() => {
        fetchAssociations();
    }, []);

    const fetchAssociations = async () => {
        const association = await fetch("http://localhost:5000/associations");
        const response = await association.json();

        setAssociations(response);
    };

    return (
        <div>
            <h1>Associations</h1>
            <section className="d-flex">
                {associations.map((association) => {
                    return (
                        <Link to={`/${association.slug}`}>
                            <article
                                className="card"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    className="card-img-top"
                                    src={association.image}
                                    alt={`${association.name}`}
                                />
                            </article>
                        </Link>
                    );
                })}
            </section>
        </div>
    );
}

export default Home;
