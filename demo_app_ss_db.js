SS_ID = '16lMB2kXiUD38ONlrMKAohgbbR3tAHUT7otMIwKypEIE'
//SS_ID ='1bV2RKPwhmHE2RWkY1DFQRNOwhYPPByTLZzyzHGRWgfE'
DB =SpreadsheetApp.openById(SS_ID); 

function demo_search () {

  var fi = get_fields('data0');
  
  
  var location =fi['location'] ; 
  var date =fi['date'] ; 
  var comments = fi['comments'];

  
  
 
  var q= {};
  
  
  /* sample 1 - the basic 1 column query */ 
  //q[location]={val:'Grand Trunk!'}; // Look for exact match - but you can change it
  
  
  /* we do not need to have an exact match, we can use provided function contains  */
  //q[location]={val:'british colonial', pred:contains}; 
  
  
  /* we can write our own match, note the pattern */
  //q[location]={val:'Grand Central DC!', pred:function (a,b) {return a.toLowerCase()==b.toLowerCase()}};
  
  /* Multi field query */ 
  
  //q[location]={val:'Grand Central DC!', pred:function (a,b) {return a.toLowerCase()==b.toLowerCase()}};
  //q[date]={val:'July', pred:contains, must:true};
  
  
  /* all June and Grills */
  q[date]={val:'June', pred:contains, must:true};
  q[location]={val:'grill', pred:contains, must:true};
  
  /* food with Abir */
  // q[comments]={val:'abir', pred:contains};
  
  /* food without  Abir */
  //q[comments]={val:'abir', pred:function (a,b) {return !contains (a,b)}};
 
  
  // airports
  // look val can be '' as long as we ignore b 
  //q[location] = {val:'', pred:function (a,b) {return contains(a,'IAD') || contains (a,'DCA') || contains (a,'BWI')}};
  

 var res = search  (q, init_look_up  ('data0'))
 
 Logger.log(res);

}











