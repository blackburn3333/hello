import React, {Component} from "react";

class Home extends Component {
    state = {};

    render() {
        return (
            <div className="container-fluid">
                <div className="row d-flex align-content-center flex-wrap basic-div">
                    <div className="col-md-4 offset-md-4 text-center">
                        <h1>Hello</h1>
                    </div>
                    <div className="col-md-12 text-center">
                        Hello is PHP reusable function generator for MySql.<br/> This application automatically generates Insert,Delete,Update and View for tables in database.
                        <h1 className="error-text-beta">BETA</h1>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;