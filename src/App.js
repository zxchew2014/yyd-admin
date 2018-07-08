import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoginPage from "./components/pages/login";
import AttendancePage from "./components/pages/teacher-attendance";
import TeacherPage from "./components/pages/teacher";
import AddTeacherPage from "./components/pages/create-teacher";
import Header from "./components/utils/header";
import UserRoute from "./routes/user-route";
import GuestRoute from "./routes/guest-route";
import SideMenu from "./components/sidemenus/index";

const UIContainer = styled.div``;
const BodyContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  .menu-container {
    flex: 0 1 20%;
  }
  .content-container {
    flex: 0 1 80%;
  }
`;
const ContentContainer = styled.div``;

class App extends React.Component {
    render() {
        return (
            <UIContainer className="ui container">
                <Header />
                <BodyContainer>
                    <SideMenu/>
                    <ContentContainer className="content-container">
                        <GuestRoute
                            location={this.props.location}
                            path="/"
                            exact
                            component={LoginPage}
                        />

                        <UserRoute
                            location={this.props.location}
                            path="/teacher/attendance"
                            exact
                            component={AttendancePage}
                        />

                        <UserRoute
                            location={this.props.location}
                            path="/teacher"
                            exact
                            component={TeacherPage}
                        />

                        <UserRoute
                            location={this.props.location}
                            path="/teacher/add"
                            exact
                            component={AddTeacherPage}
                        />
                    </ContentContainer>
                </BodyContainer>
            </UIContainer>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
