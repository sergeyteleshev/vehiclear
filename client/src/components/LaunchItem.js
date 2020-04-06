import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';



export default function LaunchItem({launch: {flight_number, mission_name, launch_date_local, launch_success}})
{
    return (
      <div className={"card card-body mb-3"}>
          <p>{flight_number}</p>
          <span className={classNames({
              'text-success': launch_success,
              'text-danger': !launch_success,
          })}>
              <p>{mission_name}</p>
          </span>
          <p><Moment format={"DD.MM.YYYY HH:mm"}>{launch_date_local}</Moment></p>
          <p>{launch_success}</p>
          <hr/>
      </div>
    );
}