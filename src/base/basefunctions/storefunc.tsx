import { useLocation } from 'react-router-dom';
import store from '../reduxstore';
import { Guid } from 'guid-typescript';
class StoreFunc {
    setStoreItems(item: any) {
            store.dispatch({
                type: 'Show_Toast',
                payload: {
                    id: Guid.create(),
                    summary: item.summary,
                    summary_raw: item.summary_raw,
                    message: item.message,
                    message_raw: item.message_raw,
                    type: item.type,
                    severity: item.severity,
                    date: new Date(),
                    position: item.position,
                    duration: item.duration
                }
            });
    }
}
export default new StoreFunc();
