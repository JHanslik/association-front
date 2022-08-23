import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

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
        <>
            <Header />
            <section className="homePreview container row mx-auto d-flex align-items-center">
                {associations.map((association) => {
                    return (
                        <article
                            className="card col-10 col-md-3 mx-auto my-3 h-100"
                            // style={{ width: "18rem" }}
                        >
                            <Link to={`/${association.slug}`}>
                                <img
                                    className="card-img-top"
                                    src={association.image}
                                    alt={association.name}
                                />
                            </Link>
                        </article>
                    );
                })}
            </section>
        </>
    );
}

export default Home;
