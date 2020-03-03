$(function(){
    var init = function() {
      var ht = $(window).outerHeight() - 130;
      $('.toc').height(ht);
      $('.content').height(ht);
    };
    init();
  var pagination = {
    getMJQuery: function() {
      if(!this.mJQuery) {
		this.mJQuery = self.parent.frames['toc'].window.jQuery;
      }
      return this.mJQuery;
    },
    menus: ['itemFront_1','itemFront_2','itemFront_3','itemFront_4','itemFront_5','item01','item01_1','item01_2','item01_3','item01_4','item01_4_1','item01_4_2','item02','item02_1','item02_2','item02_3','item02_3_1','item02_3_2','item02_4','item02_5','item03','item03_1','item03_1_1','item03_1_2','item03_1_3','item03_1_4','item03_2','item03_2_1','item03_3','item03_3_1','item03_3_2','item03_3_3','item04','item04_1','item04_1_1','item04_1_2','item05','item05_1','item05_1_1','item05_1_2','item05_1_3','item05_2','item05_2_1','item05_2_2','item05_2_3','item05_3','item06','item06_1','item06_2','item06_2_1','item06_2_1_1','item06_2_1_2','item06_2_2','item06_2_2_1','item06_2_2_2','item06_2_3','item06_2_3_1', 'item06_2_4','item07','item07_1','item07_2','item07_3','item07_4','item07_4_1','item07_5','item08','item08_1','item08_1_1','item08_1_2','item08_1_3','item08_1_3_1','item08_1_3_2','item08_1_3_3','item08_1_3_3_1','item08_1_3_3_2','item09','item09_1','item09_1_1','item09_1_1_1','item09_1_1_2','item09_1_1_3','item09_1_2','item09_1_2_1','item09_1_2_2','item09_1_2_3','item10','item10_1','item10_2','item10_2_1','item10_2_2','item11','item11_1','item11_1_1','item11_1_2','item11_2','item11_2_1','item11_2_2','item12','item12_1','item12_1_1','item12_1_2','item12_2','item12_2_1','item12_2_2',],
    currentIndex: 0,
    setCurrent: function(id) {
      var mJQuery = this.getMJQuery(),
        item = mJQuery('#' + id);
      mJQuery('.current').removeClass('current');
      item.addClass('current');
      for(var i = 0; i < this.menus.length; i++) {
        if(id === this.menus[i]) {
          this.currentIndex = i;
          return;
        }
      }
    },
    expand: function(current) {
      var flag = current.parent().parent().parent('ul');
      while(flag && flag.is(':hidden')) {
        flag.parents('li').attr('class', 'collapsable')
        flag.parents('li').children('div').attr('class', 'hitarea collapsable-hitarea');
        flag.show();
        flag = flag.parent().parent('ul');
      }
    },
    rollNext: function() {
	  if (this.currentIndex == this.menus.length-1){
		return;
	  }
      var mJQuery = this.getMJQuery(),
      item = mJQuery('#' + this.menus[this.currentIndex>=this.menus.length-1 ? 0 : ++this.currentIndex]);
      this.expand(item);
      this.setCurrent(item.attr('id'));
	  self.parent.frames['content'].window.location = item.attr('href');
    },
    rollPre: function() {
	  if (this.currentIndex <= 0){
		return;
	  }
      var mJQuery =  this.getMJQuery(),
      item = mJQuery('#' + this.menus[this.currentIndex <= 0 ? this.menus.length - 1 : --this.currentIndex]);
      this.expand(item);
      this.setCurrent(item.attr('id'));
	  self.parent.frames['content'].window.location = item.attr('href');
    },
    setEvent: function() {
      var self = this, mJQuery =  self.getMJQuery();
      mJQuery('.file a').click(function(e) {
        self.setCurrent($(this).attr('id'));
      });
      mJQuery('.folder a').click(function(e) {
        self.setCurrent($(this).attr('id'));
      });
    }
  };
  $('.up').click(function(e){
    e.preventDefault();
    pagination.rollPre();
  });
  $('.down').click(function(e){
    e.preventDefault();
    pagination.rollNext();
  });  
  $('.logo, .home').click(function(e){
    pagination.currentIndex = -1;
  });
  setTimeout(function(){pagination.setEvent(); }, 1000);
  window.pagination = pagination;
});
