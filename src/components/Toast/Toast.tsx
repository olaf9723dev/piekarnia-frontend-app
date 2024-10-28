import './Toast.css';
import React from "react";
import {IonToast} from "@ionic/react";
import {toastState$} from '../../services/event-bus.service'
import {ToastModel} from "../../models/Toast.model";

class Toast extends React.Component<{}, {
    toasts: ToastModel[],
    lastId: number;
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            toasts: [],
            lastId: 0
        };
        toastState$.subscribe((res: ToastModel | null) => {
            if (res && res.id !== -1) {
                res.id = this.state.lastId;
                this.setState({
                    toasts: [...this.state.toasts, res],
                    lastId: this.state.lastId + 1
                });
            }
        })
    }

    removeToast(id: number | undefined): void {
        this.setState({
            toasts: this.state.toasts.filter(x => x.id !== id)
        })
    }

    render() {
        return (
            <div>
                {this.state.toasts.map(toast => {
                    return (<IonToast
                        isOpen={true}
                        color={toast.color}
                        onDidDismiss={() => this.removeToast(toast.id)}
                        message={toast.message}
                        icon={toast.icon}
                        duration={toast.duration}
                        position="top"/>)
                })}
            </div>
        )
    }
}

export default Toast;
