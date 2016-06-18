/*


Basic database operations for google spread sheet data


*/






function init_look_up  (sheet_name) {
  
  var sheet= DB.getSheetByName(sheet_name);
  var numRows = sheet.getDataRange().getNumRows();
  var numCols = sheet.getDataRange().getNumColumns();
  
  var look_up_data  = sheet.getRange(2, 1, numRows-1 /* we account for the header row being non data */, numCols).getValues();
  return look_up_data;  
   
}



function get_fields (sheet_name) {
  var field_index ={};
  
  var sheet= DB.getSheetByName(sheet_name);
  var numCols = sheet.getDataRange().getNumColumns();
  var fields  = sheet.getRange(1, 1, 1, numCols).getValues()[0];
 
  
  var col_num =0;
  for (var i in fields) {
    field_index [fields[i] ] = col_num;
    col_num++
    
  }
  
  return field_index;
  
}


function get_row (sheet_name, col, val) {
  var look_up_data = init_look_up (sheet_name);
  var q= {};
  var cond = {}
  cond ['val'] = Number(val);
  q [col] = cond;

 return  search (q, look_up_data)[0]['db_row_num'];
  
}





/**

Given a query which a set of kv pairs where k is the col number (0 based) and v is a tuple
val: a string or a number
pred: a (possibly anonymous) function // optional
must: a boolean true // optional

returns the matched rows in the database. The rows are 0 based. 
Note:

Since the look up process ignore the header row *and* spreadsheet access is 1 based (as opposed to 0 based)
To access the data in row n for display purpose or further processing
we should access the n+2 row of the spreadsheet.




*/





function search  (query, look_up_data) {
  //Logger.log(look_up_data);
  
  var result_set = [];
  
  for (var i in look_up_data) {
    if ((typeof (query)=='string'&&query=='*') || matched (look_up_data [i], query)) 
    {
      
      result_set.push({db_row_num:Number(i)+2, row_data:look_up_data[i]})
      
    }
    
    
  }
  
  return result_set;
  
}


/**

Given a row of data and an array  select statement, returns true if the the row passes the select test.
A select statement is a {}. The keys are column positions (0 based) and the values is {} with one mandatory 
and two optional keys. The mandatory key is val and the optionals are pred and must. val can be a string or a number. 

The pred key points to a function which specifies what constitutes a match between value of val with value of the col
If the pred is absent, then matching defaults to equality. Pred can be a named function or an anonymous function

If the must key is present and has a value true then the specific select element has to be true in order for the
row to pass the select test


*/




function matched (row, select) {
  
//  row =  ['Abir', 5.0, 3.9, 'M'];
//  select = {0:{val:'bxir', pred:contains, must:true}, 3:{val:'M', must:true}};
//  
  
  var cols_to_look =_.keys(select)
  var res;
  
  for (var i in cols_to_look) {
    var col = cols_to_look[i]; // this is the col you are looking into
    
    var match_res;
    if (select[col]['pred'])
      match_res = select[col]['pred'](row[col], select[col]['val']);
    else 
      match_res = row[col]===select[col]['val'] // default == 
    
    if (res===undefined){
      res=match_res;
    }
    else {
      var must = false;
      must = (select[col]['must'] !== undefined && select[col]['must']==true)
      if (must)
       res = res && match_res;
      else 
       res = res || match_res;
    }
    
  }
  
  //Logger.log(res);
  return res;
  
   
    
    
    
  }
  
 





/** 

our version of string contains 





*/




function contains (s1,s2) {
  var clean_s1 = String(s1).toLowerCase();
  var clean_s2 = String(s2).toLowerCase();
  if (clean_s2.trim().length ==0) return false;
  if (clean_s1.trim().length ==0) return false;
  
  
  return (clean_s1.indexOf (clean_s2) >=0 || clean_s2.indexOf (clean_s1) >=0) 
  
  
}






