import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleComponent, Inject } from '@syncfusion/ej2-react-schedule';
export const Schedule = () => {
    const { t } = useTranslation();
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label={t('label.add')} icon="pi pi-plus" className="p-button-success mr-2 mb-2" />
                <Button label={t('label.delete')} icon="pi pi-trash" className="p-button-danger mb-2" />
            </React.Fragment>
        );
    };
    const [filterButtonState, setFilterButtonState] = useState(0);

    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const handleRangeChange = useCallback((range: any) => {
        setRange(range);
    }, []);
    const data = [
        {
            Id: 1,
            Subject: 'Meeting',
            StartTime: new Date(2023, 1, 15, 10, 0),
            EndTime: new Date(2023, 1, 15, 12, 30)
        }
    ];
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                    <ScheduleComponent
                        selectedDate={new Date(2023, 1, 15)}
                        eventSettings={{
                            dataSource: data
                        }}
                    >
                    </ScheduleComponent>
                </div>
            </div>
        </div>
    );
};
