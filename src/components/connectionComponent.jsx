import React, {Component} from "react";

import Hello from '../class/Hello';
import DataBaseConnection from '../class/ConnectionClass';

class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',

            errorMessage: '',
            connectionString: '',

            viewCopyButton: false
        }
    };

    generateConnection(event) {
        const {serverName, serverUsername, serverPassword, serverDatabase} = this.state;
        event.preventDefault();

        const data = [serverName, serverUsername, serverDatabase];
        console.log(this.checkNullStatus(data));
        if (this.checkNullStatus(data)) {
            this.setState({
                connectionString: DataBaseConnection.generateConnection(serverName, serverUsername, serverPassword, serverDatabase),
                viewCopyButton: true
            })
        } else {
            this.setState({
                errorMessage: "All fields are required"
            })
        }
    }


    checkNullStatus(data) {
        return Hello.CheckNullStatus(data);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    copyToClipBoard() {
        Hello.copyToClipBoard(this.state.connectionString);
    }

    downloadFile(event) {
        event.preventDefault();
        Hello.saveToFile(this.state.connectionString, "DBConnection", "text/plain", ".php");

    }

    resetData(event) {
        event.preventDefault();
        this.setState({
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',

            errorMessage: '',
            connectionString: '',

            viewCopyButton: false,

            tableData: [],
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12 text-center sub-div">
                        MySQL database connection
                        <hr/>
                        Generate MySQL database connection for PHP Object Oriented Programming.
                        <hr/>
                    </div>
                    <div className="col-md-3 offset-md-1 second-div">
                        <p>Enter your server details</p>
                        <form>

                            <input name="serverName"
                                   onChange={e => this.handleInputChange(e)}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Name"
                                   className="text-input"
                                   value={this.state.serverName}
                            />

                            <input name="serverUsername"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverUsername}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Username"
                                   className="text-input"/>

                            <input name="serverPassword"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverPassword}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Password"
                                   className="text-input"/>

                            <input name="serverDatabase"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverDatabase}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Database Name"
                                   className="text-input"/>

                            <button onClick={(e) => this.generateConnection(e)} className="basic-button">Generate
                            </button>
                        </form>
                        <p className="text-center error-text-sm">{this.state.errorMessage}</p>
                    </div>
                    <div className="col-md-7">
                        {
                            this.state.viewCopyButton ?
                                <div>
                                    <button className="basic-button-sm" onClick={this.copyToClipBoard()}>Copy To
                                        Clipboard
                                    </button>
                                    <button className="basic-button-sm" onClick={(e) => this.downloadFile(e)}>Download
                                    </button>
                                    <button className="basic-button-sm" onClick={(e) => this.resetData(e)}>Reset
                                    </button>
                                </div> : null

                        }
                        <pre>
                            <code>
                                {this.state.connectionString}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        )
    }

}

export default Connection;