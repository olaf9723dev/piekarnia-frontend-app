import './News.css';
import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonBackButton} from '@ionic/react';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import {get} from "../../services/http.service";

class News extends React.Component<{
    cartId: number,
    tabSelected: number
}, {newses: any[]}> {
    constructor(props: any) {
        super(props);
        this.state = {newses: []};
        get('cms/news')
            .then(res => {
                this.setState({newses: res});
            })
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'} style={{height: '6vh'}}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow about-arrow'}
                                           text={''}/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen className={'background'}>
                    <div className={'logo'} style={{marginTop: 0}}>
                        <img className={'logo-svg'} src={'assets/img/piekarnia-logo-cropped.svg'}/>
                    </div>
                    <div id={'news-list'}>
                        <h2 style={{textAlign: 'center'}}>Aktualności</h2>
                        {this.state.newses.map(element => {
                            return <div className={'news'}>
                                <h1>{element.title}</h1>
                                <p>{element.content}</p>
                            </div>
                        })}
                    </div>

                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        )
    }
}

export default News;
