import React from 'react';
import { BottomSheet } from '@alfalab/core-components-bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { Switch } from '@alfalab/core-components-switch';

const longMagneticAreas: Array<number | string> = [188, 200, 324, '100%'];
const shortMagneticAreas = [150, 188, 324];

function App() {
    const [openMagnetic, setOpenMagnetic] = React.useState(false);
    const [value, setValue] = React.useState<boolean>(false);
    const offset = value ? 0 : undefined;

    const [shortAreas, setShortAreas] = React.useState(false);
    const magneticAreas = shortAreas ? shortMagneticAreas : longMagneticAreas;

    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const handleMagnetize = (index: number) => {
        setActiveIndex(index);
        // eslint-disable-next-line no-console
        console.log('onMagnetize, index:', index, 'areas:', magneticAreas.length);
    };

    const handleAreasChange = () => {
        const nextShortAreas = !shortAreas;
        const nextAreas = nextShortAreas ? shortMagneticAreas : longMagneticAreas;

        setShortAreas(nextShortAreas);
        setActiveIndex((index) => (index === null ? null : Math.min(index, nextAreas.length - 1)));
    };

    const [openLoading, setOpenLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!openLoading) return undefined;

        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 2000);

        return () => clearTimeout(timer);
    }, [openLoading]);

    return (
        <>
            <div className='map'>
                <ButtonMobile type='button' size={48} onClick={() => setOpenMagnetic(true)}>
                    Magnetic
                </ButtonMobile>
                <ButtonMobile type='button' size={48} onClick={() => setOpenLoading(true)}>
                    Loading → Areas
                </ButtonMobile>
                <div className='switch'>
                    <Switch size={24} checked={value} label='offset=0' onChange={() => setValue((prev) => !prev)} />
                </div>
            </div>

            <BottomSheet
                open={openMagnetic}
                magneticAreas={magneticAreas}
                initialActiveAreaIndex={2}
                headerOffset={offset}
                onClose={() => setOpenMagnetic(false)}
                onMagnetize={handleMagnetize}
                title='Title'
            >
                <div style={{ padding: 16 }}>
                    <p style={{ margin: '0 0 16px' }}>
                        Текущая зона:{' '}
                        {activeIndex === null
                            ? '—'
                            : `${activeIndex} (${magneticAreas[activeIndex] ?? 'вне массива'})`}
                    </p>
                    <Switch
                        size={24}
                        checked={shortAreas}
                        label={`magneticAreas [${magneticAreas.join(', ')}]`}
                        onChange={handleAreasChange}
                    />
                </div>
            </BottomSheet>

            <BottomSheet
                open={openLoading}
                magneticAreas={loading ? undefined : [20, 80, 150, '100%']}
                initialActiveAreaIndex={2}
                onClose={() => setOpenLoading(false)}
                title='Loading → Areas'
            >
                <div style={{ padding: 16, ...(loading && {backgroundColor: 'lightcoral'}) }}>
                    {loading ? <div>Loading...</div> : <div>Content</div>}
                </div>
            </BottomSheet>

            <div className='safe-top' />
            <div className='safe-bottom' />
        </>
    );
}

export default App;
