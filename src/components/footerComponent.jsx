import React, {Component} from "react";

import FacebookIcon from "../assiets/images/if_facebook_online_social_media_734399.png";
import GitHub  from "../assiets/images/if_github_social_media_logo_1221583.png";
import WWW from "../assiets/images/if_www_logo_social_media_1071012.png";
import Insta from "../assiets/images/if_instagram_online_social_media_734394.png";
import LinkedIN from "../assiets/images/if_online_social_media_linked_in_734383.png";
import Twitter from "../assiets/images/if_online_social_media_twitter_734377.png";
import Tumbler from "../assiets/images/if_tumblr_online_social_media_734368.png";


class Footer extends Component {
    state = {};

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 text-center">
                            <p>
                                <svg className="heart" viewBox="0 0 32 29.6">
                                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                                </svg>
                            </p>
                            <p>©{(new Date().getFullYear())} Hello. All Rights Reserved<br/>
                                Designed by Jayendra Matarage</p>
                            <a  rel="noopener noreferrer" href="http://jaysblog.azurewebsites.net/AboutMe" target="_blank">
                                <img src={WWW}
                                className="img-fluid footerImage" alt="web"/>
                            </a>

                            <a  rel="noopener noreferrer" href="https://www.facebook.com/jayendramatarege" target="_blank"><img
                                src={FacebookIcon}
                                className="img-fluid footerImage" alt="fb"/></a>

                            <a href="https://github.com/blackburn3333" target="_blank"  rel="noopener noreferrer"><img
                               src={GitHub}
                                className="img-fluid footerImage" alt="gitHub"/></a>

                            <a href="https://www.instagram.com/_____syntax_error_____/" target="_blank"  rel="noopener noreferrer"><img
                                src={Insta}
                                className="img-fluid footerImage" alt="Insta"/></a>

                            <a href="https://www.linkedin.com/in/jayendra-matarage-a855ba95/" target="_blank"  rel="noopener noreferrer" ><img
                                src={LinkedIN}
                                className="img-fluid footerImage" alt="linkedIN"/></a>

                            <a  rel="noopener noreferrer" href="https://www.tumblr.com/blog/burn333348" target="_blank"><img
                                src={Tumbler}
                                className="img-fluid footerImage" alt="tumblr"/></a>

                            <a  rel="noopener noreferrer" href="https://twitter.com/Jayendramatarag" target="_blank">
                                <img src={Twitter}
                                     className="img-fluid footerImage" alt="twitter"/>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;