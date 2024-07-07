
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as React from "react";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

import { FiMenu } from 'react-icons/fi';

import { MainMenuItems } from './mainmenuitems';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './header.css'



const Header = () => {
  
  const navigate = useNavigate();

  const handleCreateBoard = () => {
      return (
          navigate(`/board/createboard`, { replace: true })
      )
}

  return (
          <>
          {['lg'].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="main-menu">
              <Container className='menu-container' fluid>
                <h4 className='navbrand' href="#">Trello</h4>
                <Navbar.Toggle children={<div className='toggle-btn'><FiMenu/></div>} className='nav-toggle' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas className='nav-box bg-dark text-white' id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Traiding Team</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="nav-div justify-content-start flex-grow-1 pe-3 align-center">

                      {
                        MainMenuItems.map((item,index) => {
                          if(item.haveChilds) {
                            return(
                              <NavDropdown key={index} title={item.title} id={`offcanvasNavbarDropdown-expand-${expand}`}>
                              {
                                item.childs.map((child,cindex) => {
                                  return(
                                    <NavDropdown.Item key={cindex} href={child.path}>{child.title}</NavDropdown.Item>
                                  ) 
                                })
                              }
                            </NavDropdown>
                            )
                          }
                          else {
                            return (
                              <Nav.Link key={index} className='link' href={item.path}>{item.title}</Nav.Link>
                            );
                          }
                        })
                      }
                      
                      {/* fill onclick */}
                      <div className='btn-create-div' onClick={() => {handleCreateBoard()}}>
                        <a className='btn-create'><FaPlus className='create-icon'/>Create</a>
                      </div>
                      
                    </Nav>


                    

                    <div className='btn-div'>
                      <Tippy content="Profile" delay={200} duration={500} theme='material' placement='bottom'>
                        <a href='/dashboard/profile'>
                          <IconButton aria-label="fingerprint" color="primary">
                            <Fingerprint/>
                          </IconButton>
                        </a>
                        
                      </Tippy>
                      
                      
                    </div>
                  
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
    );
}
export default Header;