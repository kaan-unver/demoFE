import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Scheduler from '../components/Scheduler';
import AddMeetingModal from '../components/AddMeetingModal';
import MeetingService from '../service/MeetingService';
export const Schedule = () => {
    const { t } = useTranslation();
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [meetings, setMeetings] = useState<any>([]);
    const hideDialog = () => {
        setAddModalVisible(false);
    };
    const meetingService = new MeetingService();
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label={t('label.add')} icon="pi pi-plus" className="p-button-success mr-2 mb-2" onClick={() => setAddModalVisible(true)} />
            </React.Fragment>
        );
    };
    useEffect(() => {
        if (meetings.length < 1) {
            getAll();
        }
    });
    const getAll = () => {
        meetingService.getAll().then((response) => {
            if (response.data.data) {
                setMeetings(
                    response.data.data.map((e: any) => ({
                        title: e.title,
                        startDate: new Date(e.startDate),
                        endDate: new Date(e.endDate),
                        id: e.id,
                        location: '',
                        description: e.description
                    }))
                );
            }
        });
    }
    const changeSelectedMeeting = useCallback((e: any) => {
        meetingService.delete(e).then((response) => {
            let _meetings = meetings.filter((item: any) => e != item.id);
            setMeetings(_meetings);
        });
    }, []);
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <Scheduler setSelectedMeeting={changeSelectedMeeting} data={meetings} />
                    {addModalVisible && <AddMeetingModal visibleModal={addModalVisible} getAll={getAll} hideDialog={hideDialog} />}
                </div>
            </div>
        </div>
    );
};
