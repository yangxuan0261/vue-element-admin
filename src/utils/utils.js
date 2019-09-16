import { Notification } from 'element-ui';
import { Message } from 'element-ui';

class CUtils {
    cleanUndefined(obj) {
        // if (!obj) {
        //     return
        // }

        // var keys = Object.keys(obj)
        // keys.forEach(key => {
        //     console.log(`--- key:${key}, val:${obj[key]}`);
        // });
    }

    notify(opt) {
        // Notification.success('hello')
        Message.success('这是一条消息提示');
    }

    async wait(t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, t * 1000);
        })
    }

    tableHeaderCss(rowIndex) {
        if (rowIndex === 0) {
            return 'background-color: #545454;color: #fff;font-weight: 700;'
        }
    }
}

const utils = new CUtils()

export default utils
