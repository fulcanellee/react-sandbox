import React from 'react';
import './App.css';
import {BaseModal} from '@alfalab/core-components-base-modal'
import {ButtonMobile} from '@alfalab/core-components/button/mobile'
import {ConfirmationMobile, useConfirmation} from '@alfalab/core-components/confirmation/mobile'
import {Typography} from '@alfalab/core-components/typography'
import {Gap} from '@alfalab/core-components/gap'

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
    const {
        confirmationState,
        confirmationScreen,
        setConfirmationState,
        setConfirmationScreen,
    } = useConfirmation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Gap size={32} />
            <Text />
            <ButtonMobile type='button' size={40} onClick={handleOpen}>
                Сменить адрес
            </ButtonMobile>
            <Text />
            <BaseModal open={open} onClose={handleClose} iOSLock={true}>
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
        </div>
    );
}

export default App;
