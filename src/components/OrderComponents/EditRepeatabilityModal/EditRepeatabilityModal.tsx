import './EditRepeatabilityModal.css'
import React from 'react';
import {IonButton, IonModal, IonSelect, IonSelectOption} from '@ionic/react';
import {updateRepeatability} from '../../../services/order-history.service';

class EditRepeatabilityModal extends React.Component<{
    editRepeatability: boolean,
    closeModalCallback: any,
    orderId: number,
    dataCallback: any
}, {
    repeatDay: string[],
    repeatFrequency: any,
    repeatFrequency2: any
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            repeatDay: [],
            repeatFrequency: '',
            repeatFrequency2: ''
        }
    }

    render() {
        return (
            <IonModal
                isOpen={this.props.editRepeatability}
                onDidDismiss={() => this.props.closeModalCallback(false)}
                swipeToClose
                mode={'ios'}
                className={'edit-repeatability-modal'}
                style={{color: 'black'}}
            >
                <div className={'if-to-repeat'}>

                    <div className={'choose-repeat'}>
                        <h5 style={{color: 'black'}}>Wybierz dni, w które chcesz, aby zamówienie było
                            powtarzane:</h5>
                        <IonSelect
                            className={'select-picker-cart'}
                            cancelText={'Anuluj'}
                            okText={'Wybierz'}
                            multiple
                            onIonChange={(e) => this.setState({repeatDay: e.detail.value})}
                            value={this.state.repeatDay}
                        >
                            <IonSelectOption value={1}>Poniedziałek</IonSelectOption>
                            <IonSelectOption value={2}>Wtorek</IonSelectOption>
                            <IonSelectOption value={3}>Środa</IonSelectOption>
                            <IonSelectOption value={4}>Czwartek</IonSelectOption>
                            <IonSelectOption value={5}>Piątek</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div className={'repeat-freq'}>
                        <h5 style={{color: 'black'}}>Wybierz częstotliwość z jaką zamówienie będzie
                            powtarzane:</h5>
                        <div className={'freq-selects'}>
                            <div style={{display: 'flex', alignItems: 'center', color: 'black'}}>co</div>
                            <IonSelect
                                className={'select-picker-cart select-freq'}
                                cancelText={'Anuluj'}
                                okText={'Wybierz'}
                                onIonChange={(e) => {
                                    this.setState({repeatFrequency: e.detail.value})
                                }}
                            >
                                <IonSelectOption value={1}>1</IonSelectOption>
                                <IonSelectOption value={2}>2</IonSelectOption>
                                <IonSelectOption value={3}>3</IonSelectOption>
                                <IonSelectOption value={4}>4</IonSelectOption>
                                <IonSelectOption value={5}>5</IonSelectOption>
                                <IonSelectOption value={6}>6</IonSelectOption>
                            </IonSelect>

                            <IonSelect
                                className={'select-picker-cart select-freq'}
                                cancelText={'Anuluj'}
                                okText={'Wybierz'}
                                onIonChange={(e) => {
                                    this.setState({repeatFrequency2: e.detail.value})
                                }}
                            >
                                <IonSelectOption value={
                                    this.state.repeatFrequency === 1 ? 'tydzień' :
                                        [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'tygodnie' :
                                            'tygodni'
                                }>{
                                    this.state.repeatFrequency === 1 ? <span>tydzień</span> :
                                        [2, 3, 4].some(x => x === this.state.repeatFrequency) ?
                                            <span>tygodnie</span> :
                                            <span>tygodni</span>
                                }</IonSelectOption>
                                <IonSelectOption value={
                                    this.state.repeatFrequency === 1 ? 'miesiąc' :
                                        [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'miesiące' :
                                            'miesięcy'
                                }>{this.state.repeatFrequency === 1 ? 'miesiąc' :
                                    [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'miesiące' :
                                        'miesięcy'}</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                </div>

                <div className={'offer-button'} style={{marginTop: '5vh'}}>
                    <IonButton
                        color={'dark'}
                        shape={'round'}
                        className={'custom-button single-button'}
                        onClick={() => updateRepeatability(
                            this.props.orderId,
                            `co ${this.state.repeatFrequency} ${this.state.repeatFrequency2}`,
                            this.state.repeatDay
                        )
                            .then(() => {
                                this.props.closeModalCallback(false)
                                this.props.dataCallback(
                                    `co ${this.state.repeatFrequency} ${this.state.repeatFrequency2}`,
                                    this.state.repeatDay
                                )
                            })}
                    >
                        Zatwierdź
                    </IonButton>
                </div>

            </IonModal>
        );
    }
}

export default EditRepeatabilityModal;
