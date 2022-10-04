//
// Popular profiles component
// Configure for mobile and desktop devices
//
import React from "react";

import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import { useProfileData } from "../../contexts/ProfileDataContext";

import Asset from "../../components/Asset";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  // Use Profile data context component
  const { popularProfiles } = useProfileData();

  return (
    <Container
      // Check mobile or desktop
      // Show first 4 profiles on mobile and 5 on desktop
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p className="text-center mt-2">
            <strong>Most Followed Profiles</strong>
          </p>
          <hr />
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results.slice(0, 5).map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
