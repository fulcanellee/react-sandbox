import React from 'react';
import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { Switch } from '@alfalab/core-components-switch';

function App() {
    const [open, setOpen] = React.useState(false);
    const [openMagnetic, setOpenMagnetic] = React.useState(false);
    const [value, setValue] = React.useState<boolean>(false);
    const offset = value ? 0 : undefined;

    return (
        <>
            <div className='map'>
                <ButtonMobile type='button' size={48} onClick={() => setOpen(true)}>
                    Обычная
                </ButtonMobile>
                <ButtonMobile type='button' size={48} onClick={() => setOpenMagnetic(true)}>
                    Magnetic
                </ButtonMobile>
                <div className='switch'>
                    <Switch size={24} checked={value} label='offset=0' onChange={() => setValue((prev) => !prev)} />
                </div>
            </div>

            <BottomSheet
                open={open}
                hideOverlay={true}
                initialHeight='full'
                headerOffset={offset}
                onClose={() => setOpen(false)}
                title='Title'
            >
                Content
            </BottomSheet>

            <BottomSheet
                open={openMagnetic}
                hideOverlay={true}
                magneticAreas={[0, 300, '100%']}
                initialActiveAreaIndex={1}
                headerOffset={offset}
                onClose={() => setOpenMagnetic(false)}
                title='Title'
            >
                Content
            </BottomSheet>

            <div className='safe-top' />
            <div className='safe-bottom' />
        </>
    );
}

export default App;
