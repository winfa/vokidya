// component/attraction-list-Item/attraction-list-Item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },

    index: {
      type: Number,
      value: 0
    },

    coverImage: {
      type: String,
      value: ''
    },

    images: {
      type: Array,
      value: ''
    },

    rating: {
      type: String,
      value: ''
    },

    protectLevel: {
      type: String,
      value: ''
    },

    tags: {
      type: Array,
      value: ''
    },

    dataSource: {
      type: Object,
      value: {}
    },

    distance: {
      type: String,
      value: ''
    },

    collectionData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collection: false,
  },

  ready() {
    this.data.collectionData.forEach((item) => {
      if (this.data.index === item.index) {
        this.setData({ collection: true })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImage() {
      this.triggerEvent('clickItem', this.data.dataSource);
    },
    clickCollection() {
      let date = new Date();
      let formatDate;
      let timeDiff = new Date().getTime() - date.getTime();
      let dayDiff = Math.floor((timeDiff) / (24 * 3600 * 1000));
      if (date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() == new Date().getDate()){
        formatDate = "今天";
      } else if (dayDiff < 30 && dayDiff > 0){
        formatDate = dayDiff +"天前"
      }
      else {
        formatDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
      }
       
      console.log(formatDate);
      let data = { index: this.data.index, name: this.data.name, img: this.data.coverImage, date: formatDate };
      let collectionStorage = wx.getStorageSync('collections');
      let _this = this;

      if (!this.data.collection) {

        if (!collectionStorage) {
          collectionStorage = [data];
        } else {
          collectionStorage = JSON.parse(collectionStorage);
          collectionStorage.push(data);
        }
        this.setCollectStorage(true, collectionStorage, function () {
          _this.setData({ collection: true });
        })

      } else {

        collectionStorage = JSON.parse(collectionStorage);

        collectionStorage.forEach((item, index) => {
          if (item.index === this.data.index) {
            collectionStorage.splice(index, 1);
          }
        })

        this.setCollectStorage(false, collectionStorage, function () {
          _this.setData({ collection: false });
        })
      }
    },

    setCollectStorage(boolean, value, callback) {
      wx.setStorage({
        key: 'collections',
        data: JSON.stringify(value),
        success: (res) => {
          callback(res)
        }
      })
    }
  }
})
