import {IonContent, IonPage, NavContext} from '@ionic/react';
import './Calendar.css';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridDay from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import plLocale from '@fullcalendar/core/locales/pl'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getClientRepeatedOrders} from '../services/order-history.service';
import {OrderRepeatabilityModel} from '../models/order-repeatability.model';

class Calendar extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {
    repeatedOrders: OrderRepeatabilityModel[],
    events: any[],
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            repeatedOrders: [],
            events: [],
        }
    }

    static contextType = NavContext;

    redirectFunction(destination: string) {
        this.context.navigate(destination)
    }

    componentDidMount() {
        getClientRepeatedOrders()
            .then(res => {
                this.setState({
                    repeatedOrders: res
                })
                const events: any[] = []
                let now = new Date();
                now.setHours(0, 0, 0, 0)
                let dateFuture = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
                let daysOfYear: Date[] = [];
                for (let d = dateFuture; now <= d; now.setDate(now.getDate() + 1)) {
                    daysOfYear.push(new Date(now));
                }
                res.forEach((order: OrderRepeatabilityModel) => {
                    if (order.frequency) {
                        switch (order.frequency) {
                            case 'co 1 tydzień':
                                events.push({
                                    title: `Zamówienie numer ${order.order.orderId}`,
                                    daysOfWeek: order.repeatedDays.map(day => day.dayNumber),
                                    id: order.order.id
                                })
                                break;
                            case 'co 2 tygodnie':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 7;
                                    }
                                }
                                break;
                            case 'co 3 tygodnie':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 14;
                                    }
                                }
                                break;
                            case 'co 4 tygodnie':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 21;
                                    }
                                }
                                break;
                            case 'co 1 miesiąc':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 30;
                                    }
                                }
                                break;
                            case 'co 2 miesiące':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 60;
                                    }
                                }
                                break;
                            case 'co 3 miesiące':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 90;
                                    }
                                }
                                break;
                            case 'co 4 miesiące':
                                for (let day = 0; day <= daysOfYear.length; day++) {
                                    for (let event of order.repeatedDays) {
                                        if (daysOfYear[day].getDay() === event.dayNumber) {
                                            events.push({
                                                title: `Zamówienie numer ${order.order.orderId}`,
                                                date: daysOfYear[day],
                                                id: order.order.id
                                            })
                                        }
                                    }
                                    if (day % 7 === 0) {
                                        day += 120;
                                    }
                                }
                                break;
                        }
                    }
                    this.setState({
                        events: events,
                    })
                })
            })

        window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    calendarRef1 = React.createRef()
    calendarRef2 = React.createRef()

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Kalendarz'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>
                <IonContent>
                    <div className={'calendar-wrapper'}>
                        <FullCalendar
                            //@ts-ignore
                            ref={this.calendarRef1}
                            key={this.state.events.length}
                            plugins={[dayGridPlugin, bootstrap5Plugin, timeGridDay, interactionPlugin]}
                            themeSystem={'bootstrap5'}
                            headerToolbar={{
                                left: 'dayGridMonth',
                                center: 'prev,title,next',
                                right: ''
                            }}
                            titleFormat={{month: 'long', year: 'numeric'}}
                            dayHeaderFormat={{weekday: 'narrow'}}
                            weekends={true}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            locale={plLocale}
                            height={'auto'}
                            fixedWeekCount={false}
                            dayCellClassNames={'amoa'}
                            events={this.state.events}
                            showNonCurrentDates={false}
                            navLinks={false}
                            buttonIcons={{
                                dayGridMonth: 'calendar-month',
                                timeGridDay: 'calendar-date'
                            }}
                            eventClick={this.eventClick}
                            dateClick={this.dateClick}

                            // nowIndicator={true}
                            // now={(new Date()).toISOString()}
                            // slotLabelFormat={
                            //     {
                            //         hour: '2-digit',
                            //         minute: '2-digit',
                            //         omitZeroMinute: false,
                            //         meridiem: false
                            //     }
                            // }
                            // slotMinTime={'07:00:00'}
                            // slotDuration={'01:00:00'}

                        />
                        <FullCalendar
                            //@ts-ignore
                            ref={this.calendarRef2}
                            key={this.state.events.length + 1}
                            plugins={[listPlugin, interactionPlugin]}
                            initialView="listWeek"
                            headerToolbar={
                                {
                                    left: '',
                                    center: '',
                                    right: '',
                                }
                            }
                            weekends={true}
                            editable={true}
                            events={this.state.events}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            locale={plLocale}
                            height={'auto'}
                            fixedWeekCount={false}
                            navLinks={true}
                            eventClick={this.selectMethod}
                        />
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

    selectMethod = (info: any) => {
        this.redirectFunction(`/app/order-history/${info.event.id}/order-details`)
    }

    dateClick = (info: { date: any; dayEl: HTMLElement; }) => {
        const elBlue = document.querySelectorAll('.blue');
        if (elBlue.length > 0) {
            (elBlue[0] as HTMLElement).classList.remove('blue');
        }
        //@ts-ignore
        const calendarApi = this.calendarRef2.current.getApi();
        calendarApi.gotoDate(info.date);
        (info.dayEl as HTMLElement).classList.add('blue');
    }
    eventClick = (info: any) => {
        const elBlue = document.querySelectorAll('.blue');
        if (elBlue.length > 0) {
            (elBlue[0] as HTMLElement).classList.remove('blue');
        }
        //@ts-ignore
        const calendarApi = this.calendarRef2.current.getApi();
        calendarApi.gotoDate(info.event.start);
        // change the border color just for fun
        // @ts-ignore
        (info.el.parentElement.parentElement.parentElement as HTMLElement).classList.add('blue');
    }

}

export default Calendar;
