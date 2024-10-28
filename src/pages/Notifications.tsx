import {IonContent, IonPage} from '@ionic/react';
import './Notifications.css';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import {getNotifications} from '../services/notifications-service';
import {NotificationModel} from '../models/notification.model';
import Card from '../UI/Card';
import moment from 'moment';

class Notifications extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {
    notificationsList: NotificationModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            notificationsList: []
        }
    }

    componentDidMount() {
        getNotifications()
            .then(res => {
                this.setState({
                    notificationsList: res
                })
            })
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Komunikaty'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div className={'notifications-wrapper'}>
                        {
                            this.state.notificationsList.map(notification => (
                                <Card className={'notification-card'}>
                                    <div className={'notification-title'}>{notification.title}</div>
                                    <div className={'notification-date'}>
                                        <div>{moment(notification.createDate).format('DD.MM.YYYY  HH:mm')}</div>
                                        <div>Push</div>
                                    </div>
                                    <div className={'notification-content'}>
                                        {notification.content}
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        );
    }
}

export default Notifications;
