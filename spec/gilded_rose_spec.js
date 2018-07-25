const classes = require('../gilded_rose.js');



describe("Gilded Rose", function() {

  it("should build an item in a shop with unchanging name", function() {
    const gildedRose = new classes.Shop([ new classes.Item("foo",0,0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

});

describe("Quality", function() {

  it("should decline by one every day before Sell", function() {
    const gildedRose = new classes.Shop([ new classes.Item("foo",10,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
  });

  it("should never be negative", function() {
    const gildedRose = new classes.Shop([ new classes.Item("foo",10,1) ]);
    const items = gildedRose.updateQuality(gildedRose.updateQuality());
    expect(items[0].quality).toEqual(0);
  });

  it ("should decline twice as fast after sell date passes", function(){
    const gildedRose = new classes.Shop([ new classes.Item("foo",4,20) ]);
    let items = gildedRose.items;  
    for (i=1;i<5;i++) {
        items = gildedRose.updateQuality();
    }
    expect(items[0].quality).toEqual(16);
    expect(items[0].sellIn).toEqual(0);

    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(14);
  });

  it ("should never be more than 50", function(){
    const gildedRose = new classes.Shop([ new classes.Item("Aged Brie",10,50),new classes.Item('Backstage passes to a TAFKAL80ETC concert',4,50),new classes.Item('Incorrect input',10,60) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
    expect(items[2].quality).toEqual(50);
  });

});

describe("SellIn", function() {

  it("should decline by one every day", function() {
    const gildedRose = new classes.Shop([ new classes.Item("foo",10,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9);
  });


});

describe("Aged Brie", function() {

  it("should increase in quality each day", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Aged Brie",10,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });


});

describe("Sulfuras, Hand of Ragnaros", function() {

  it("should not change in quality or sellIn", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Sulfuras, Hand of Ragnaros",10,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(10);
    expect(items[0].sellIn).toEqual(10);
  });


});


describe("Backstage passes to a TAFKAL80ETC concert", function() {

  it("should gain one quality each day if more than 10 days sellIn", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Backstage passes to a TAFKAL80ETC concert",20,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });

  it("should gain two quality each day if less than 10 days sellIn", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Backstage passes to a TAFKAL80ETC concert",7,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("should gain three quality each day if less than 5 days sellIn", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Backstage passes to a TAFKAL80ETC concert",3,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("should have zero quality if after concert", function() {
    const gildedRose = new classes.Shop([ new classes.Item("Backstage passes to a TAFKAL80ETC concert",0,10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

});
