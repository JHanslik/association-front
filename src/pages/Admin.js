import { useEffect, useState } from "react";
import Header from "../components/Header";
import moment from "moment";

function Admin(props) {
    const [messages, setMessages] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchMessages();
        fetchAssociations();
    }, []);

    const fetchMessages = async () => {
        const request = await fetch(
            `http://localhost:5000/associations/messages`
        );
        const response = await request.json();

        setMessages(response);
    };

    const fetchAssociations = async () => {
        const request = await fetch("http://localhost:5000/associations");
        const response = await request.json();

        setAssociations(response);
    };

    const handleSelectChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <Header />
            <main className="container mx-auto row d-flex flex-column align-items-center">
                <select
                    name="Sort"
                    className="col-8 col-md-4 text-center"
                    onChange={handleSelectChange}
                >
                    <option value="all">All</option>
                    {associations.map((association) => {
                        return (
                            <option value={association.slug}>
                                {association.name}
                            </option>
                        );
                    })}
                </select>

                {filter === "all"
                    ? messages.map((message) => {
                          return (
                              <article
                                  key={message.name}
                                  className="my-3 col-10 text-center"
                              >
                                  <h3>Sent by : {message.name}</h3>
                                  <p>
                                      On : {moment(message.time).format("LLL")}
                                  </p>
                                  <p>to : {message.association}</p>
                                  <p>{message.message}</p>
                              </article>
                          );
                      })
                    : messages
                          .filter((message) => message.slug === filter)
                          .map((filteredMessage) => {
                              return (
                                  <article
                                      key={filteredMessage.name}
                                      className="my-3 col-10 text-center"
                                  >
                                      <h3>Sent by : {filteredMessage.name}</h3>
                                      <p>
                                          On :{" "}
                                          {moment(filteredMessage.time).format(
                                              "LLL"
                                          )}
                                      </p>
                                      <p>to : {filteredMessage.association}</p>
                                      <p>{filteredMessage.message}</p>
                                  </article>
                              );
                          })}
            </main>
        </>
    );
}

export default Admin;
