import React, { Component } from "react";
import KontakDataService from "../services/kontak.service";

export default class Kontak extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getKontak = this.getKontak.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateKontak = this.updateKontak.bind(this);
    this.deleteKontak = this.deleteKontak.bind(this);

    this.state = {
      currentKontak: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getKontak(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentKontak: {
          ...prevState.currentKontak,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentKontak: {
        ...prevState.currentKontak,
        description: description
      }
    }));
  }

  getKontak(id) {
    KontakDataService.get(id)
      .then(response => {
        this.setState({
          currentKontak: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentKontak.id,
      title: this.state.currentKontak.title,
      description: this.state.currentKontak.description,
      published: status
    };

    KontakDataService.update(this.state.currentKontak.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentKontak: {
            ...prevState.currentKontak,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateKontak() {
    KontakDataService.update(
      this.state.currentKontak.id,
      this.state.currentKontak
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Kontak Berhasil Diubah!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteKontak() {    
    KontakDataService.delete(this.state.currentKontak.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/kontaks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentKontak } = this.state;

    return (
      <div>
        {currentKontak ? (
          <div className="edit-form">
            <h4>Kontak</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentKontak.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Deskripsi</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentKontak.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentKontak.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentKontak.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteKontak}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateKontak}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Kontak...</p>
          </div>
        )}
      </div>
    );
  }
}
