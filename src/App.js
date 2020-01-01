import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoginPage from "./components/pages/login";
import AttendancePage from "./components/pages/teachers/retrieve";
import StudentAttendancePage from "./components/pages/students/retrieve";
import TeacherPage from "./components/pages/teachers";
import EditTeacherPage from "./components/pages/teachers/update";
import AddTeacherPage from "./components/pages/teachers/create";
import StudentPage from "./components/pages/students";
import AddStudentPage from "./components/pages/students/create";
import VerifyEmailPage from "./components/pages/verify-email";
import Header from "./components/utils/header";
import UserRoute from "./routes/user-route";
import GuestRoute from "./routes/guest-route";
import EditStudentPage from "./components/pages/students/update";
import RemoveStudentPage from "./components/pages/students/delete";
import RemoveTeacherPage from "./components/pages/teachers/delete";
import BranchPage from "./components/pages/branches";
import AddBranchPage from "./components/pages/branches/create";
import UpdateBranchPage from "./components/pages/branches/update";
import TopMenu from "./components/menus/top-menu";
import AdminPage from "./components/pages/admin";
import AddAdminPage from "./components/pages/admin/create";
import EditAdminPage from "./components/pages/admin/update";

const UIContainer = styled.div``;
const BodyContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  .content-container {
    flex: 0 1 100%;
  }
`;
const ContentContainer = styled.div``;

class App extends React.Component {

  render() {
    return (
      <UIContainer className="ui container">
        <Header />
        <TopMenu />
        <br />
        <BodyContainer>
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

            <UserRoute
              location={this.props.location}
              path="/admin"
              exact
              component={AdminPage}
            />

            <UserRoute
              location={this.props.location}
              path="/admin/add"
              exact
              component={AddAdminPage}
            />

            <UserRoute
              location={this.props.location}
              path="/admin/edit"
              exact
              component={EditAdminPage}
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
