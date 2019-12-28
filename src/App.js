import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoginPage from "./components/pages/login";
import AttendancePage from "./components/pages/teacher-attendance";
import StudentAttendancePage from "./components/pages/student-attendance";
import TeacherPage from "./components/pages/teacher";
import EditTeacherPage from "./components/pages/edit-teacher";
import AddTeacherPage from "./components/pages/add-teacher";
import StudentPage from "./components/pages/student";
import AddStudentPage from "./components/pages/add-student";
import VerifyEmailPage from "./components/pages/verify-email";
import Header from "./components/utils/header";
import UserRoute from "./routes/user-route";
import GuestRoute from "./routes/guest-route";
import SideMenu from "./components/sidemenus/index";
import EditStudentPage from "./components/pages/edit-student";
import RemoveStudentPage from "./components/pages/delete-student";
import RemoveTeacherPage from "./components/pages/delete-teacher";
import BranchPage from "./components/pages/branches/index";
import AddBranchPage from "./components/pages/branches/create";
import UpdateBranchPage from "./components/pages/branches/update";

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
          <SideMenu />
          <ContentContainer className="content-container">
            <GuestRoute
              location={this.props.location}
              path="/"
              exact
              component={LoginPage}
            />

            <UserRoute
              location={this.props.location}
              path="/verify_email"
              exact
              component={VerifyEmailPage}
            />

            <UserRoute
              location={this.props.location}
              path="/teacher/attendance"
              exact
              component={AttendancePage}
            />

            <UserRoute
              location={this.props.location}
              path="/student/attendance"
              exact
              component={StudentAttendancePage}
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

            <UserRoute
              location={this.props.location}
              path="/teacher/edit"
              exact
              component={EditTeacherPage}
            />

            <UserRoute
              location={this.props.location}
              path="/teacher/remove"
              exact
              component={RemoveTeacherPage}
            />

            <UserRoute
              location={this.props.location}
              path="/student"
              exact
              component={StudentPage}
            />

            <UserRoute
              location={this.props.location}
              path="/student/add"
              exact
              component={AddStudentPage}
            />

            <UserRoute
              location={this.props.location}
              path="/student/edit"
              exact
              component={EditStudentPage}
            />

            <UserRoute
              location={this.props.location}
              path="/student/remove"
              exact
              component={RemoveStudentPage}
            />

            <UserRoute
              location={this.props.location}
              path="/branch"
              exact
              component={BranchPage}
            />

            <UserRoute
              location={this.props.location}
              path="/branch/add"
              exact
              component={AddBranchPage}
            />

            <UserRoute
              location={this.props.location}
              path="/branch/update"
              exact
              component={UpdateBranchPage}
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
