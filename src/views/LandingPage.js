import React from "react";

// reactstrap components
import { Button, Container, Input, Row, Col } from "reactstrap";

import { CLIENT } from "api.js";

// core components
import ImageList from "components/Unsplash/ImageList.js";
import IndexNavbar from "components/Navbars/IndexNavbar";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      images: [],
      header: "Your Images will be here!",
      page: 0,
      currentPage: 1
    };
    this.myRef = React.createRef(); // Create a ref
  }

  onSearchSubmit = async term => {
    await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${term}`,
      {
        headers: {
          Authorization: `${CLIENT}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("HEY", json);
        let tepmTerm = "searching images for " + term;
        this.setState({
          images: json.results,
          header: tepmTerm,
          page: json.total_pages
        });
      })
      .catch(err => console.log(err));
  };

  onFormSubmit = event => {
    event.preventDefault();

    setTimeout(
      function() {
        this.myRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }.bind(this),
      500
    );

    this.onSearchSubmit(this.state.term);
  };
  render() {
    let pageHeader = React.createRef();
    console.log(this.state.term);
    return (
      <>
        <IndexNavbar />
        <div
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center">
              <h1>Unsplash Image Search</h1>
              <h3>Search free high-resolution photos</h3>
              <br />
              <form onSubmit={this.onFormSubmit} className="ui form">
                <Input
                  placeholder="Type your curiosity"
                  type="text"
                  value={this.state.term}
                  onChange={e => this.setState({ term: e.target.value })}
                />
              </form>

              <br />
              <Button
                className="btn-round"
                color="neutral"
                type="button"
                outline
                onClick={this.onFormSubmit}
              >
                Search
              </Button>
            </div>
          </Container>
        </div>
        <div className="main">
          <div className="section text-center">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="8">
                  <h2 className="title">{this.state.header}</h2>
                </Col>
              </Row>
              <div ref={this.myRef}>
                <ImageList images={this.state.images} />
              </div>
            </Container>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>
              Coded by <a href="www.tunaayberk.com">Tuna Ayberk Ozmen</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
