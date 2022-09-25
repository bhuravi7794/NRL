import { useState } from 'react';
import { Dropdown } from 'bootstrap';
import Select from 'react-select';

function DropDown(props) {
    const propsData = props.data;
    const updateselect =(event) => {
        props.update(event,propsData,props.name,props.parentData);
    }
    return (
        <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Select placeholder= {props.name} options={props.dropdowndata} onChange={updateselect} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
}

export default DropDown;