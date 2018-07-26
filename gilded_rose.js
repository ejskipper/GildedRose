class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {

      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':

        break;

        case 'Backstage passes to a TAFKAL80ETC concert':
          item.quality++;
          if (item.sellIn < 11) {
            item.quality++;
          }
          if (item.sellIn < 6) {
            item.quality++;
          }
          if (item.sellIn < 1) {
            item.quality = 0;
          }
          item.sellIn--;
        break;

        case 'Aged Brie':
          item.quality++;
          item.sellIn--;
        break;

        default:
          item.quality--;
          item.sellIn--;      
          if (item.sellIn < 0) {
            item.quality--;
          }
          if (item.name.includes('Conjured')) {
            item.quality--;
            if (item.sellIn < 0) {
              item.quality--;
            }
          }
        break;

      }
      if (item.quality > 50) {
             item.quality = 50;
      }
      if (item.quality < 0) {
        item.quality = 0;
      }
    });
      
    return this.items;
  }
}


module.exports = {Item,Shop};