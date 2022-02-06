import { useEffect, useState } from "react";
import "./PersonalizeAvatarCard.css";


const PersonalizeAvatar = ({ token, tokenId, personalize }) => {
  // Logic
  const [state, setState] = useState({
    name: "",
    description: "",
    story: "",
  });
  const [editing, setEditing] = useState(false);

  const onChange = (e) => {
    let { name, value } = e.target;
    setState((props) => {
      return {
        ...props,
        [name]: value,
      };
    });
  };
  useState(() => {
    let { name, description, story } = token;
    setState({ name, description, story });
  }, []);

  useEffect(() => {}, [editing]);

  if (!editing) {
    return (
      <div className="card-container" style={{ color: "black" }}>
        <section className="image-container">
          <img
            className="card-image"
            src={`https://api.goldenvoyagerparty.com/api/token-metadata/image/${tokenId}`}
            alt="Display of Voyager"
          />
        </section>
        <section className="card-body">
          <section className="title">
            <p className="title" style={{ textDecoration: "underline" }}>
              {`Voyager ${tokenId}`}
            </p>
            <br />
          </section>
          <label style={{ fontWeight: "bold" }}>Name</label>:{" "}
          {state.name.length > 25
            ? state.name.slice(0, 25) + "..."
            : state.name}
          <br />
          <label style={{ fontWeight: "bold" }}>Description</label>:{" "}
          {state.description.length > 15
            ? state.description.slice(0, 25) + "..."
            : state.description}
          <br />
          <label style={{ fontWeight: "bold" }}>Story</label>:{" "}
          {state.story.length > 25
            ? state.story.slice(0, 25) + "..."
            : state.story}
          <br />
        </section>
        <section
          className="card-button"
          onClick={(e) => {
            e.preventDefault();
            setEditing(!editing);
          }}
        >
          <p>E D I T / V I E W</p>
        </section>
      </div>
    );
  } else {
    return (
      <>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="card-container-modal" style={{ color: "black" }}>
              <section className="image-container">
                <img
                  className="card-image"
                  src={`https://api.goldenvoyagerparty.com/api/token-metadata/image/${tokenId}`}
                  alt="Display of Voyager"
                />
              </section>
              <section className="card-body">
                <input
                  placeholder="Voyager Name"
                  className="modal-form"
                  name="name"
                  value={state.name}
                  onChange={onChange}
                />
                <br />
                <input
                  placeholder="Voyager Description"
                  className="modal-form"
                  name="description"
                  value={state.description}
                  onChange={onChange}
                />
                <br />
                <textarea
                  placeholder="Voyager Story"
                  className="modal-form"
                  style={{ height: "200px" }}
                  name="story"
                  value={state.story}
                  onInput={onChange}
                />
                <br />
              </section>
              <section className="button-container">
                <section className="card-button-left">
                  <input
                    value="S A V E"
                    className="button"
                    type="button"
                    name={tokenId}
                    onClick={async (evt) => {
                      await personalize(evt, state, tokenId);
                      setEditing(!editing);
                    }}
                  />
                </section>
                <section className="card-button-right">
                  <input
                    value="C A N C L E"
                    className="button"
                    type="button"
                    name={tokenId}
                    onClick={async (evt) => {
                      setState(token);
                      setEditing(!editing);
                    }}
                  />
                </section>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PersonalizeAvatar;
