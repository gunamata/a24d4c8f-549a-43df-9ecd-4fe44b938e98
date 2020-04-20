import React from 'react';
import { Consumer } from '../context';

const Meals = (() => {
    return (
            <Consumer>
                {value => {
                        const { mealSchedule } = value;
                        return(
                            <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
                                <ol id="list">
                                    {
                                        mealSchedule.map(item => (
                                            <li className={item.classname}>{item.mealname} for {item.guest} on {item.date }</li>
                                        ))
                                    }
                                </ol>
                            </div>
                        )
                }}
            </Consumer>
        );
});
export default Meals;
