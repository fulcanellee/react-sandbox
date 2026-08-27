import React, {useState} from 'react';
import './App.css';
import {SidePanelMobile} from '@alfalab/core-components-side-panel/mobile'
import {ConfirmationMobile, useConfirmation} from '@alfalab/core-components-confirmation/mobile'

function App() {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const {
        setConfirmationState,
        setConfirmationScreen,
    } = useConfirmation();

  return (
    <div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      <button onClick={() => setOpen(prev => !prev)}>Открыть</button>
        <SidePanelMobile open={open} onClose={handleClose}>
            <SidePanelMobile.Header hasCloser={true}/>
            <SidePanelMobile.Content>
                <ConfirmationMobile
                    screen='INITIAL'
                    state='INITIAL'
                    onChangeState={setConfirmationState}
                    onChangeScreen={setConfirmationScreen}
                    onInputFinished={() => {}}
                    onSmsRetryClick={() => {}}
                />
            </SidePanelMobile.Content>
        </SidePanelMobile>
    </div>
  );
}

export default App;
