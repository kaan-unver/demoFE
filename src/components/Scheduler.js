import * as React from 'react';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 5, 25, 9, 35),
      endDate: new Date(2018, 5, 25, 11, 30),
      id: 0,
      location: 'Room 1',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 5, 25, 12, 11),
      endDate: new Date(2018, 5, 25, 13, 0),
      id: 1,
      location: 'Room 1',
    }, {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 5, 25, 14, 30),
      endDate: new Date(2018, 5, 25, 15, 35),
      id: 2,
      location: 'Room 2',
    }, {
      title: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2018, 5, 26, 10, 0),
      endDate: new Date(2018, 5, 26, 11, 0),
      id: 3,
      location: 'Room 2',
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2018, 5, 26, 12, 0),
      endDate: new Date(2018, 5, 26, 13, 35),
      id: 4,
      location: 'Room 2',
    }, {
      title: 'New Brochures',
      startDate: new Date(2018, 5, 26, 14, 30),
      endDate: new Date(2018, 5, 26, 15, 45),
      id: 5,
      location: 'Room 2',
    }]
    
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: new Date(),

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);

  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.props.setSelectedMeeting(deleted)
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={this.props.data}
          height={900}
        >
          <ViewState
            currentDate={currentDate}
            
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <WeekView
            startDayHour={9}
            endDayHour={17}
          />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
