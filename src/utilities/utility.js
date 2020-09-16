
// eslint-disable-next-line import/prefer-default-export
export const Utility = {
  createArrayByConfig(array, config) {
    const arrayRet = [];
    for (let index = 0; index < array.length; index += 1) {
      const newElement = {};
      const element = array[index];
      // eslint-disable-next-line no-underscore-dangle
      newElement._id = element._id;
      for (let k = 0; k < config.length; k += 1) {
        const configElement = config[k];
        if (configElement.bindField.indexOf('.') > 0) {
          newElement[configElement.field] = this.getAnnidateValue(configElement.bindField.split('.'), element);
        } else {
          newElement[configElement.field] = element[configElement.bindField];
        }
      }
      arrayRet.push(newElement);
    }
    return arrayRet;
  },
  createArrayByConfigV2(array, config) {
    const arrayRet = [];
    for (let index = 0; index < array.length; index += 1) {
      const newElement = {};
      const element = array[index];
      // eslint-disable-next-line no-underscore-dangle
      newElement._id = element._id;
      const keysConfig = Object.keys(config);
      keysConfig.forEach((keyConfig) => {
        const configElement = config[keyConfig];
        if (configElement.bind.indexOf('.') > 0) {
          newElement[keyConfig] = this.getAnnidateValue(configElement.bind.split('.'), element);
        } else {
          newElement[keyConfig] = element[configElement.bind];
        }
      });
      arrayRet.push(newElement);
    }
    return arrayRet;
  },
  getAnnidateValue(annidateFields, obj) {
    let objTemp = obj;
    for (let k = 0; k < annidateFields.length; k += 1) {
      const annidateField = annidateFields[k];
      if (objTemp[annidateField]) {
        objTemp = objTemp[annidateField];
      } else {
        objTemp = null;
        break;
      }
    }
    return objTemp;
  },
};
