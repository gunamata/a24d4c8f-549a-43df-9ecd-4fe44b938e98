import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';
import { Provider } from './context';

class App extends Component {

    render() {
        return (
            <Provider>
                <div className="container-fluid">
                    <center>
                        <h2>Menu scheduler</h2>
                    </center>
                    <div className="container">
                        <Bookings></Bookings>
                        <Error></Error>
                        <Meals></Meals>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;