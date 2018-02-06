# ss_db

Bunch of code that allows us to treat any google sheet as a relational database
```javascript
get_fields(sheet_name) //utility code
init_look_up (sheet_name) // setup code
search(query, look_up_data) // the main function
matched (row, select) // this is more internal - -will explain
```
* speed the development process - do not reinvent the wheel
* keep the bugs localized

## Useage

1. Copy ss_db.js file to your project (in GAS it will have to be ss_db.gs)
2. Create a client function. You may use the demo_app_ss_db.js as a template
3. Note examples included in ss_db that are commented out. These are helpful.  
4. Read comments
