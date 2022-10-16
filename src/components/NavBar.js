//
// JavaScript for the NavBar component
//
import axios from "axios";
import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router-dom";

import logo from "../assets/kki-logo.png";
import Avatar from "./Avatar";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

import styles from "../styles/NavBar.module.css";

// Setting NavBar menu
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Mobile devices
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Handle sign out user
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  // Icon for add a new album
  const addAlbumIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/albums/create"
    >
      <i className="far fa-plus-square"></i>Album
    </NavLink>
  );

  // Show icons for logged in user
  const loggedInIcons = (
    <>
      {/* Liked Page */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      {/* Sign out icon */}
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      {/* Profile Icon */}
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  // Show icons for logged out user
  const loggedOutIcons = (
    <>
      {/* Sign in Icon */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      {/* Sign up Icon */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  // Render NavBar based on sign in and sign out status
  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        {/* Company Logo */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        {/* Show add album icon to signed in user only */}
        {currentUser && addAlbumIcon}

        {/* Toggle between expand and collapse menu bar */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />

        {/* Menu items that can be collapsed */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* Home Page */}
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {/* About Page */}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/about"
            >
              <i className="fa fa-info-circle"></i>About
            </NavLink>
            {/* Contact Page */}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/contacts"
            >
              <i className="fa fa-address-book"></i>Contact
            </NavLink>
            {/* Additional menu items based on sign in and sign out status */}
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
