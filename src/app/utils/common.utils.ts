

export default class CommonUtil {

    getNamesArray(list): Array<String> {
        const result = list.map(element => element.name);
        return result;
    }

    getIdsArray(list): Array<Number> {
        const result = list.map(element => element.id);
        return result;
    }



}
