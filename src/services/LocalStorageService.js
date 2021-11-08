class LocalStorageService {
  meetlinkConfig = 'meetlinks_config';
  meetlinkClasses = 'meetlinks_classes';

  setConfig(config) {
    const configJSON = JSON.stringify(config);
    localStorage.setItem(this.meetlinkConfig, configJSON);
  }

  deleteData() {
    localStorage.removeItem(this.meetlinkClasses);
    localStorage.removeItem(this.meetlinkConfig);
  }

  initClasses(classes) {
    const classesJSON = JSON.stringify(classes);
    localStorage.setItem(this.meetlinkClasses, classesJSON);
  }

  getClasses() {
    return JSON.parse(localStorage.getItem(this.meetlinkClasses));
  }

  getClass(classId) {
    const classes = this.getClasses();
    return classes.find((_class) => _class.classId === classId);
  }

  getLinks(classId) {
    const classes = this.getClasses();
    const classWithId = classes.find((_class) => _class.classId === classId);
    return classWithId.links;
  }

  updateLinks(classId, data) {
    const _classes = this.getClasses();
    const classes = [];

    _classes.map((_class) => {
      if(_class.classId === parseInt(classId)) {
        if(_class.links.length > 0) {
          _class.links.map((link) => {
            if(link.index === data.index) {
              link.link = data.link;
            } else {
              _class.links.push({
                index: data.index,
                link: data.link
              });
            }
          });
        } else {
          _class.links.push({
            index: data.index,
            link: data.link
          });
        }

        classes.push(_class);
      }
    });

    const classesJSON = JSON.stringify(classes);
    localStorage.setItem(this.meetlinkClasses, classesJSON);
  }
}

export default new LocalStorageService();
