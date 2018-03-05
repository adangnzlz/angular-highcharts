
import map from 'lodash/fp/map';

export default class CommonUtil {

    getNamesArray(list): Array<String> {
        const result = list.map(element => element.name);
        return result;
    }

    getIdsArray(list): Array<Number> {
        const result = list.map(element => element.id);
        return result;
    }

    // Function to fill groups when an index of the object generated is empty
    fillEmptyGroup(list, listToFill) {
        listToFill.forEach((element, index) => {
            if (!list[index]) {
                list[index] = [];
            }
        });
        return list;
    }



}
