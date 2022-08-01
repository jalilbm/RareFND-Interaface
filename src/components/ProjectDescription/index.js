import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import render from 'react';


export default function ProjectDescription(props) {

  const a = "<p><em><u>Hello! We are Fundraising for ikram, please help us</u></em><br />\r\n<br />\r\n<img alt=\"\" src=\"https://via.placeholder.com/300.png/09f/fff\" /></p>\r\n\r\n<p><strong>Thank you</strong></p>"

  return (
    <div className="bg-white p-5">
      <h1 className="display-4 fw-bold text-center pt-5 mb-5">Description</h1>
      <div dangerouslySetInnerHTML={{ __html: props.description }} style={{marginLeft: "80px"}}></div>
    </div>
  )
}
