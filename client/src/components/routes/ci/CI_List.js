import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import axios from "axios";
import { Component } from "react";
import { Redirect } from 'react-router-dom';
import setAuthToken from "../../../actions/setAuthToken";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';


const requestUserProfile = async () => {
    const userProfile = await axios.get('/viewProfile');
    return userProfile.data;
}

const requestAttendanceRecods = async () => {
    const attendanceRecords = await axios.get('/viewAttendance');
    return attendanceRecords.data;
}

     
class Course_Instructor_List extends Component {
    state = {
        isLoggedIn: 0,
        componentInMain: <div />
    }

    handleInstructorCourses = async (event) => {
        console.log("clicked on instructor courses")

        this.props.setComponentInMain("instructorCourses")
    }

    handleViewStaffProfiles = () => {
        console.log("clicked on view staff profile")
        this.props.updateRequestStaffProfile();
        this.props.setComponentInMain("viewStaffProfiles");
    }
    handleManageCourseStaff = async () => {
        console.log("clicked on mange course staff")
        await this.props.updateRequestCourseStaff();
        this.props.setComponentInMain("manageCourseStaff");
    }
     
    async componentDidMount() {
        if (!localStorage.getItem('auth-token')) {
            this.setState({ isLoggedIn: 1 });
            return;
        }
        try {
           // setAuthToken(localStorage.getItem('auth-token'));
            await axios.get('/authStaffMember');
            this.setState({ isLoggedIn: 2 });
        }
        catch (err) {
            this.setState({ isLoggedIn: 1 });
        }
    }

    render() {
        if (this.state.isLoggedIn === 0)
            return <div />;
        if (this.state.isLoggedIn === 1) {
            return <Redirect to='/' />;
        }
        return (
            <div >

                <List style={(localStorage.getItem("academicMemberType")!=0)?{display:'none'}:{}}>
                <ListItem button  backgroundColor="primary" onClick={this.props.handleHODFunctionalities} >
                        <ListItemIcon><SwapHorizIcon /></ListItemIcon>
                        <ListItemText primary="HOD functionalities" />
                    </ListItem>
                    </List>
                      <Divider />

                  <List> 
                       <ListItem button onClick={this.handleInstructorCourses} >
                        <ListItemIcon><MenuBookIcon /></ListItemIcon>
                        <ListItemText primary="Instructor courses" />
                    </ListItem>
                    <ListItem button key="View Staff Profiles" onClick={this.handleViewStaffProfiles}>
                        <ListItemIcon> <SupervisorAccountIcon /></ListItemIcon>
                        <ListItemText primary={"View Staff Profiles"}  />
                    </ListItem>
                    <ListItem button key="Manage Course Staff" onClick={this.handleManageCourseStaff}>
                        <ListItemIcon> <SupervisedUserCircleIcon /></ListItemIcon>
                        <ListItemText primary={"Manage Course Staff"}  />
                    </ListItem>

                </List>
            </div>
        )
    }
}

export default Course_Instructor_List;