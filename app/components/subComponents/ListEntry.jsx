import React from 'react';
//list
const ListEntry = (props) => {
  return (
    <div>
      <ul>
        {props.entries.map((entry) => (
            <li>
              {entry}
            </li>
          ))}
      </ul>
    </div>
  )
};

export default ListEntry;
