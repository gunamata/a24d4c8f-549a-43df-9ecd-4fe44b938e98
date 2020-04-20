import React from 'react';
import { Consumer } from '../context';

const Error = (() => {
    return (
            <Consumer>
                {value => {
                        const { error } = value;
                        return(
                                <div className={error === "" ? 'hidden' : ''}>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 error">
                                                <div id="list">
                                                        <div className="error-msg">
                                                                <i className="fa fa-times-circle"></i>
                                                                <p>{error}</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        )
                }}
            </Consumer>
        );
});

export default Error;
