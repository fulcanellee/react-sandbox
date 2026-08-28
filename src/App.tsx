import React from 'react';
import './App.css';
import {BaseModal} from '@alfalab/core-components/base-modal'
import {ButtonMobile} from '@alfalab/core-components/button/mobile'
import {ConfirmationMobile, useConfirmation} from '@alfalab/core-components/confirmation/mobile'
import {Typography} from '@alfalab/core-components/typography'
import {Gap} from '@alfalab/core-components/gap'
import {SidePanelMobile} from '@alfalab/core-components/side-panel/mobile'

const Text = () => (
    <>
        <Typography.Text tag='p'>
            В 2001 году в России начал действовать Федеральный закон №115 «О противодействии
            легализации доходов, полученных преступным путём, и финансированию терроризма». В рамках
            закона банки могут блокировать карты, отказывать в проведении сомнительных операций,
            ограничить доступ в интернет-банк или запрашивать документы, если по операции клиента
            возникли подозрения.
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            Требования 115-ФЗ и связанных с ним документов Банка России часто меняются,
            предприниматели не всегда успевают за ними следить. Последствия нарушений
            «антиотмывочного» законодательства всегда неприятны: приходится остановить
            бизнес-процессы и доказать банку законность операций. Специалисты собрали
            понятные рекомендации, как сэкономить время на объяснения и предотвратить блокировки
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            115-ФЗ касается всех предпринимателей, фирм и физлиц, а также тех, кто пользуется
            банковским счётом для бизнеса, крупных денежных переводов или личных расчётов.
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            Обналичивание — сомнительные операции, когда юрлицо или предприниматель снимает со
            счёта более 80% от оборота или переводит деньги на счета физлиц, которые затем
            снимают в наличной форме.
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            Вывод капитала за границу — это переводы нерезидентам по договорам об импорте
            работ/услуг и результатов интеллектуальной деятельности, по которым проведение
            расчётов осуществляется без одновременной уплаты НДС.
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            Транзитные операции — операции, в процессе которых деньги поступают на счёт компании
            от других резидентов и списываются в короткие сроки.
        </Typography.Text>
    </>
);

function App() {
    const [open, setOpen] = React.useState(false);
    const [openSidePanel, setOpenSidePanel] = React.useState(false);
    const {
        confirmationState,
        confirmationScreen,
        setConfirmationState,
        setConfirmationScreen,
    } = useConfirmation();

    const {
        confirmationState: confirmationState2,
        confirmationScreen: confirmationScreen2,
        setConfirmationState: setConfirmationState2,
        setConfirmationScreen: setConfirmationScreen2,
    } = useConfirmation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ---------------------------------------------------------------------
    // Воркэраунд известного бага WebKit (bugs.webkit.org/show_bug.cgi?id=153224
    // "Tapping into an <input> within a position:fixed element scrolls to the
    // top of the page"): на iOS Safari первый фокус на <input> внутри
    // полноэкранного position:fixed контейнера (наш SidePanelMobile) вызывает
    // визуальный "скачок" контента в момент появления клавиатуры.
    //
    // Причина: вместо того чтобы скроллить саму модалку, Safari в этот момент
    // компенсирует фокус, пытаясь скроллить ФОНОВУЮ страницу под модалкой —
    // и это ломает позиционирование её fixed-элементов. Баг официально закрыт
    // WebKit в 2016-м, но задокументированно регрессировал повторно на iOS
    // 15.4.1 в 2022-м — то есть это системное, а не разово исправленное
    // ограничение движка.
    //
    // Идея воркэраунда: если фоновая страница уже прижата к самому верху
    // (scrollTop === 0) к моменту появления клавиатуры, скроллить физически
    // некуда — компенсации Safari не за что "зацепиться", и скачок не
    // происходит. Ниже — минимальная реализация этой идеи для SidePanelMobile.
    // ---------------------------------------------------------------------

    /** Позиция скролла страницы до открытия панели — чтобы вернуть её обратно при закрытии. */
    const scrollPositionBeforeOpenRef = React.useRef(0);

    /**
     * Небольшая пауза перед открытием панели. Если у Safari в этот момент ещё
     * развёрнут тулбар (адресная строка), она обычно схлопывается только на
     * реальный touch-скролл — пауза даёт шанс этому схлопыванию завершиться
     * ДО появления клавиатуры, а не одновременно с ним.
     */
    const OPEN_DELAY_MS = 100;

    const handleOpenSidePanel = () => {
        scrollPositionBeforeOpenRef.current = window.scrollY;

        // "Трогаем" скролл ещё до открытия панели — это может подтолкнуть Safari
        // пересчитать состояние тулбара заранее.
        window.scrollTo(0, window.scrollY);

        setTimeout(() => setOpenSidePanel(true), OPEN_DELAY_MS);
    };

    const handleCloseSidePanel = () => {
        // Возвращаем страницу туда, где она была до открытия панели.
        window.scrollTo(0, scrollPositionBeforeOpenRef.current);
        setOpenSidePanel(false);
    };

    React.useEffect(() => {
        if (!openSidePanel) return;

        // Прижимаем фон к самому верху сразу при открытии панели — ДО того,
        // как пользователь успеет сфокусироваться на поле ввода и вызвать
        // появление клавиатуры.
        window.scrollTo(0, 0);
    }, [openSidePanel]);

    return (
        <div>
            <Gap size={32} />
            <Text />
            <ButtonMobile type='button' size={40} onClick={handleOpen}>
                Сменить адрес
            </ButtonMobile>
            <ButtonMobile type='button' size={40} onClick={handleOpenSidePanel}>
                Сменить адрес Side Panel
            </ButtonMobile>
            <Text />
            <BaseModal open={open} onClose={handleClose} scrollLock={true}>
                    <ConfirmationMobile
                        screen={confirmationScreen}
                        state={confirmationState}
                        onChangeState={setConfirmationState}
                        onChangeScreen={setConfirmationScreen}
                        onInputFinished={() => setConfirmationState('INITIAL')}
                        onSmsRetryClick={() => setConfirmationState('INITIAL')}
                        phone='+7 ··· ··· 07 24'
                        requiredCharAmount={4}
                        alignContent='center'
                    />
            </BaseModal>
            <SidePanelMobile open={openSidePanel} onClose={handleCloseSidePanel}>
                <SidePanelMobile.Header sticky={true} hasCloser={true} />
                <SidePanelMobile.Content>
                    <ConfirmationMobile
                        screen={confirmationScreen2}
                        state={confirmationState2}
                        onChangeState={setConfirmationState2}
                        onChangeScreen={setConfirmationScreen2}
                        onInputFinished={() => setConfirmationState2('INITIAL')}
                        onSmsRetryClick={() => setConfirmationState2('INITIAL')}
                        phone='+7 ··· ··· 07 24'
                        requiredCharAmount={4}
                        alignContent='center'
                    />
                </SidePanelMobile.Content>
            </SidePanelMobile>
        </div>
    );
}

export default App;
