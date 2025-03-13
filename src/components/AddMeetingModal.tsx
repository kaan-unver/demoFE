import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import StoreFunc from '../base/basefunctions/storefunc';

import React, { useEffect, useRef, useState } from 'react';
// import MeetingService from '../../service/Meeting/MeetingService';
import { useTranslation } from 'react-i18next';
import { classNames } from 'primereact/utils';
import Select from 'react-select';
import { Calendar } from 'primereact/calendar';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { addLocale, locale } from 'primereact/api';
import MeetingService from '../service/MeetingService';
import { Email, domains } from '@smastrom/react-email-autocomplete';
import { formatDate } from '@fullcalendar/core';
import Datetime from 'react-datetime';
const MeetingAddModal = (props: any) => {
    const meetingService = new MeetingService();

    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStardDate] = useState<any>('');
    const [endDate, setEndDate] = useState<any>('');
    const [file, setFile] = useState<any>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const addMeeting = () => {
        setSubmitted(true);
        if (title && startDate && endDate) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('Title', title), formData.append('Description', description ?? description);
            formData.append('StartDate', new Date(startDate._d.getTime() - startDate._d.getTimezoneOffset() * 60000).toISOString().slice(0, -1));
            formData.append('EndDate', new Date(endDate._d.getTime() - endDate._d.getTimezoneOffset() * 60000).toISOString().slice(0, -1));
            formData.append('File', file ?? file);
            meetingService
                .add(formData)
                .then((response: any) => {
                    const item = {
                        summary: t('success'),
                        message: [t('operation.success')],
                        severity: 'success',
                        position: 'top',
                        duration: 5000,
                        type: response.config.url
                    };
                    StoreFunc.setStoreItems(item);
                    props.getAll()
                    props.hideDialog(false);
                })
                .catch((error) => {
                    const item = {
                        summary: t('fail'),
                        message: error.data.messages,
                        severity: 'error',
                        position: 'top',
                        duration: 5000,
                        type: error.config.url
                    };
                    setIsLoading(false);
                    StoreFunc.setStoreItems(item);
                });
        }
    };
    
    const addMeetingDialogFooter = (
        <div className="flex flex-row justify-content-end">
            <Button label={t('label.cancel')} icon="pi pi-times" className="p-button-text p-button-danger" onClick={props.hideDialog} />
            <Button label={t('label.save')} icon="pi pi-check" className="p-button-text p-button-success" loading={isLoading} onClick={addMeeting} />
        </div>
    );
    addLocale('tr', {
        firstDayOfWeek: 0,
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumatesi'],
        dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
        dayNamesMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        today: 'Bugün',
        clear: 'Temizle'
    });

    locale('tr');
    addLocale('TR', {
        firstDayOfWeek: 0,
        dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumatesi'],
        dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
        dayNamesMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        today: 'Bugün',
        clear: 'Temizle'
    });

    locale('TR');
    const baseList = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'msn.com'];

    return (
        <Dialog visible={props.visibleModal} style={{ width: '450px', maxWidth: '95%' }} header={t('add.meeting')} modal className="p-fluid" footer={addMeetingDialogFooter} onHide={props.hideDialog}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="field col-12 mb-2 py-0">
                    <label htmlFor="calendar">{t('start.date')}*</label>
                        <Datetime inputProps={{ className: 'p-inputtext' }} onChange={(e) => setStardDate(e)} />
                    {submitted && !startDate && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field col-12 mb-2 py-0">
                    <label htmlFor="calendar">{t('end.date')}*</label>
                    <Datetime inputProps={{ className: 'p-inputtext' }} onChange={(e) => setEndDate(e)} />
                    {submitted && !endDate && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field col-12 mb-2 py-0">
                    <label htmlFor="title">{t('title')}*</label>
                    <InputText id="title" value={title} maxLength={11} onChange={(e) => setTitle(e.target.value)} className={classNames({ 'p-invalid': submitted && !title })} />
                    {submitted && !title && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field col-12 mb-2 py-0">
                    <label htmlFor="description">{t('desc')}</label>
                    <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="field col-12 mb-2 py-0">
                    <label>{t('file')}(pdf)</label>
                    <span>
                        <div style={{ border: '1px solid #249ee4', borderRadius: '5px' }}>
                            <input className="my-4 mx-2" type="file" accept="image/png, image/jpg, image/jpeg" onChange={(e: any) => setFile(e.target.files[0])} />
                        </div>
                    </span>
                </div>
            </div>
        </Dialog>
    );
};

export default MeetingAddModal;
