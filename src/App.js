import React, {Component} from 'react';
import Home from './components/homeComponent';
import Footer from './components/footerComponent';
import Connection from './components/connectionComponent';
import Insert from './components/insertComponent';
import ViewData from './components/viewDataTableComponent';
import Update from './components/updateComponent';
import Delete from  './components/deleteComponent';
import Crud from './components/crudComponent';


import './App.css';

class App extends Component {


    render() {
        return (
            <div className="container-fluid">
                <div className="row main-row">
                    <div className="col-2 col-sm-1 col-md-2 col-lg-2 col-xl-2 side-nav ">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            <a className="nav-link active side-nav-item" id="v-pills-home-tab" data-toggle="pill"
                               href="#v-pills-home"
                               role="tab"
                               aria-controls="v-pills-home" aria-selected="true">
                                <span className="material-icons d-md-none nav-mini-icon">home</span>
                                <span className="material-icons side-nav-icon d-none d-md-inline-block">home</span><span
                                className="d-none d-sm-none d-md-inline-block"> Home</span></a>

                            <a className="nav-link side-nav-item" id="v-pills-profile-tab" data-toggle="pill"
                               href="#v-pills-profile" role="tab"
                               aria-controls="v-pills-profile" aria-selected="false">
                                <span className="material-icons d-md-none ">link</span>
                                <span
                                    className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">link</span><span
                                className="d-none d-sm-none d-md-inline-block">Generate Connection</span></a>

                            <a className="nav-link side-nav-item" id="v-pills-messages-tab" data-toggle="pill"
                               href="#v-pills-messages"
                               role="tab"
                               aria-controls="v-pills-messages" aria-selected="false">
                                <span className="material-icons d-md-none">note_add</span>
                                <span className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">note_add</span><span
                                className="d-none d-sm-none d-md-inline-block">Generate Insert Form</span></a>

                            <a className="nav-link side-nav-item" id="v-pills-settings-tab" data-toggle="pill"
                               href="#v-pills-settings"
                               role="tab"
                               aria-controls="v-pills-settings" aria-selected="false">
                                <span className="material-icons  d-md-none">view_agenda</span>
                                <span
                                    className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">view_agenda</span><span
                                className="d-none d-sm-none d-md-inline-block"> Generate View Data Table</span></a>

                            <a className="nav-link side-nav-item" id="v-pills-update-tab" data-toggle="pill"
                               href="#v-pills-update"
                               role="tab"
                               aria-controls="v-pills-update" aria-selected="false">
                                <span className="material-icons  d-md-none">edit</span>
                                <span
                                    className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">edit</span><span
                                className="d-none d-sm-none d-md-inline-block"> Generate Update Data</span></a>
                            <a className="nav-link side-nav-item" id="v-pills-update-tab" data-toggle="pill"
                               href="#v-pills-delete"
                               role="tab"
                               aria-controls="v-pills-update" aria-selected="false">
                                <span className="material-icons  d-md-none">delete</span>
                                <span
                                    className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">delete</span><span
                                className="d-none d-sm-none d-md-inline-block"> Generate Delete Data</span></a>

                            <a className="nav-link side-nav-item" id="v-pills-update-tab" data-toggle="pill"
                               href="#v-pills-crud"
                               role="tab"
                               aria-controls="v-pills-update" aria-selected="false">
                                <span className="material-icons  d-md-none">all_inclusive</span>
                                <span
                                    className="material-icons side-nav-icon d-none d-sm-none d-md-inline-block">all_inclusive</span><span
                                className="d-none d-sm-none d-md-inline-block"> Generate CRUD for table</span></a>
                        </div>
                    </div>
                    <div className="col-10 col-sm-11 col-md-10 col-lg-10 col-xl-10">
                        <div className="tab-content basic-div" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                                 aria-labelledby="v-pills-home-tab"><Home />
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
                                 aria-labelledby="v-pills-profile-tab"><Connection/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel"
                                 aria-labelledby="v-pills-messages-tab"><Insert/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel"
                                 aria-labelledby="v-pills-settings-tab"><ViewData/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-update" role="tabpanel">
                                <Update/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-delete" role="tabpanel">
                            <Delete/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-crud" role="tabpanel">
                                <Crud/>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
