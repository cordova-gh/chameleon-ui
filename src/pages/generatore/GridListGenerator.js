export default class GridListGenerator {
  templateWord = 'template';
  scriptWord = 'script';
  styleWord = 'style';
  braceWord = '${';
  backTickWord = '`';

  constructor(config) {
    this.config = config;
  }
  generate() {
    return this.templateGridList() + this.scriptGridList() + this.styleGridList();
  }
  // eslint-disable-next-line class-methods-use-this
  templateGridList() {
    return '';
  }
  // eslint-disable-next-line class-methods-use-this
  scriptGridList() {
    return '';
  }
  // eslint-disable-next-line class-methods-use-this
  styleGridList() {
    return '';
  }
}
