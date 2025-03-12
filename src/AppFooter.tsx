import React from 'react';

const AppFooter = (props: any) => {
    return (
        <div className="layout-footer">
            <div className="logo-box">
                <div style={{ height: '40px' }} />
                <img id="footer-logo" src={`assets/layout/images/20x20.png`} alt="demo-logo" style={{ height: '20px' }} />
            </div>
        </div>
    );
};

export default AppFooter;
