import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';

const HConfirmDelete = (props: any) => {
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };
    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={props.Delete} />
        </>
    );
    return (
        <Dialog visible={deleteDialog} style={{ width: '320px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {<span>Are you sure you want to delete?</span>}
            </div>
        </Dialog>
    );
};

export default HConfirmDelete;
