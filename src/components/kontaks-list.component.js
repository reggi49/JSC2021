import React, { Component } from "react";
import KontakDataService from "../services/kontak.service";
import { Link } from "react-router-dom";

export default class KontaksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveKontaks = this.retrieveKontaks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveKontak = this.setActiveKontak.bind(this);
    this.removeAllKontaks = this.removeAllKontaks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      kontaks: [],
      currentKontak: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveKontaks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveKontaks() {
    KontakDataService.getAll()
      .then(response => {
        this.setState({
          kontaks: response.data.results
        });
        console.log(response.data.results);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveKontaks();
    this.setState({
      currentKontak: null,
      currentIndex: -1
    });
  }

  setActiveKontak(kontak, index) {
    this.setState({
      currentKontak: kontak,
      currentIndex: index
    });
  }

  removeAllKontaks() {
    KontakDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentKontak: null,
      currentIndex: -1
    });

    KontakDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          kontaks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, kontaks, currentKontak, currentIndex } = this.state;
    let gender;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Kontak List</h4>

          <ul className="list-group">
            {kontaks &&
              kontaks.map((kontak, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveKontak(kontak, index)}
                  key={index}
                >
                  <img src={kontak.picture.thumbnail} width="24" height="24"></img>
                  {kontak.name.first}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllKontaks}
          >
            Hapus Semua
          </button>
        </div>
        <div className="col-md-6">
          {currentKontak ? (
            <div>
              <h4>Kontak</h4>
              <div>
                <img src={currentKontak.picture.thumbnail} width="24" height="24"></img>
              </div>
              <div>
                <label>
                  <strong>Nama:</strong>
                </label>{" "}
                {currentKontak.name.title + currentKontak.name.first + currentKontak.name.last }
              </div>
              <div>
                <label>
                  <strong>Lahir:</strong>
                </label>{" "}
                {currentKontak.dob.date}
              </div>
              <div>
                <label>
                  <strong>Jenis Kelamin:</strong>
                </label>{" "}
                {currentKontak.gender}
                {/* {currentKontak.gender = 'female' ? 'Perempuan' : 'Cowo'} */}
              </div>
              <div>
                <label>
                  <strong>Surel:</strong>
                </label>{" "}
                {currentKontak.email}
              </div>
              <div>
                <label>
                  <strong>Telepon:</strong>
                </label>{" "}
                {currentKontak.phone}
              </div>
              <div>
                <label>
                  <strong>Seluler:</strong>
                </label>{" "}
                {currentKontak.cell}
              </div>
              <div>
                <label>
                  <strong>Tempat Tinggal:</strong>
                </label>{" "}
                {currentKontak.location.street.number},
                {currentKontak.location.street.name},
                {currentKontak.location.city},
                {currentKontak.location.state},
                {currentKontak.location.country},
                {currentKontak.location.postcode}
              </div>
              <div>
                <label>
                  <strong>Koordinat:</strong>
                </label>{" "}
                {currentKontak.location.coordinates.latitude}, {currentKontak.location.coordinates.longitude}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentKontak.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/kontaks/" + currentKontak.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Kontak...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
