import React from 'react';
import $ from 'jquery';
//list

const ListEntryCreate = (props) => {

  const handleSelect = (e) => {
    var venue = $(e.target).attr('id');
    var address = $(e.target).attr('class');
    console.log('HOST SELECTED', venue + ' @ ' + address)
    $('#options').children().css('background-color', 'white');
    $('#options').children().css('box-shadow', '');
    $(e.target).css('box-shadow', 'inset 0 0 0 1px #27496d,inset 0 2px 30px #193047');
    $(e.target).css('background-color', '#D3D3D3');
    props.selectCallback(venue, address);
  }

  return (
    <div id='options'>
      {props.entries.map( (entry, ind) => (
        <div style={itemStyle} onClick={handleSelect} key={ind} id={entry.restaurant.name} className={entry.restaurant.location.address} >
            Name: {entry.restaurant.name}<br></br>
            Cuisine: {entry.restaurant.cuisines}<br></br>
            Locality: {entry.restaurant.location.locality}<br></br>
            Rating: {entry.restaurant.user_rating.aggregate_rating}<br></br>
            <img src={entry.restaurant.thumb} width={100} height={100}></img><br></br>
      </div>
        ))}
  </div> )
}

const itemStyle = {
  border: 'solid black',
  borderWidth: '1px',
  borderRadius: '70px',
  padding: '10px',
  textAlign: 'center',
  width: '425px',
  display: 'inline-block'
}

export default ListEntryCreate;
