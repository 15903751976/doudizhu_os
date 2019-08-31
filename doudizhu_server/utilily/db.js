const  mysql = require('mysql');
let client=undefined;
/**query自写的数据库插入方法，里面的  connection.query(sql  为实际插入数据库中的连接插入语句*/
const query=function (sql,cb) {//query查询
    console.log('query = '+ sql);
    client.getConnection(function (err,connection) {//获取连接mysql的对象池
        if (err){
            console.log('connection mysql err' + err);
            cb(err);
            throw err;
        }else{
               connection.query(sql,function (connerr,result,fileds) {//连接插入操作query是數據庫查詢語句
                if (connerr){
                    console.log('query Success = '+ connerr);
                    cb(connerr);
                } else{
                    cb(null,result);
                }
                connection.release();//连接的释放操作，释放mysql的对象池
            })
        }
    });
};
/**插入更ql语句  拼接数据库更新语句，从app传来参数*/
const insertSql=function(table,data){
    //INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);
    let sql = 'insert into ' + table;
    let keyStr='(';
    let valuesStr = ' values (';
    for (let i in data){
        keyStr += i + ',';
        if((typeof  data[i]).indexOf('string') === 0){
            valuesStr += "'" +  data[i]  + "'" + ',';
        }else{
            valuesStr += data[i] + ',';
        }
    }
    keyStr=keyStr.substring(0,keyStr.length-1);
    keyStr += ')';
    valuesStr=valuesStr.substring(0,valuesStr.length-1);
    valuesStr += ")";
    sql += keyStr + valuesStr;
    return sql;
    console.log('db.js里insert 拼接的Sql = '+ JSON.stringify(sql))
};
/** 更新Sql语句  拼接数据库更新语句*/
const  updateSql=function(table,mainKey,mainValue,data){
    //UPDATE tb_name SET column1 = new_value1,column2 = new_value2,… WHERE definition
  console.log("updateSql data = " + JSON.stringify(data));
    let sql='update ' + table + 'set ';
  for(let i in data){
      if ((typeof data[i]).indexOf('string')===0){
          sql += i + '=' + "'" + data[i] + "'" + ',';
      }
      else{
          sql += i + '=' + data[i] + ',';
      }
  }
    sql=sql.substring(0,sql.length-1);
    if ((typeof mainValue).indexOf('string')===0){
        sql += ' where '+ mainKey + ' = ' + "'" + mainValue + "'" + ';';
    }
    else{
        sql += ' where '+ mainKey + ' = ' + mainValue + ';';
    }
    return sql;
};
/**config是连接数据库的一些配置,连接数据库 */
exports.connect=function (config) {//p2 4m27s  config是连接数据库的一些配置
    client=mysql.createPool(config);//访问数据库的对象池
};
/**用query调用select查找玩家*/
exports.checkPlayer=function (uniqueID,cb) {//数据库是异步调用的，所以用回调函数的形式
    //查找玩家数据
    let sql='select * from t_playerinfo where unique_id = ' + uniqueID + ';';
    query(sql,function (err,data) {//query查询
        if (err){
              console.log('check player err = ',cb)
        }
        console.log('check player success = ' + JSON.stringify(data))
        cb(err,data)
    });
};
/**从db里面传来的  insertPlayerInfo参数*/
exports.insertPlayerInfo = function (data) {//  app传来的语句sql数据，调用query方法进行连接
    /**把data放到updateSql方法中进行拼接，返回拼接完成的数据库更新语句赋值给sql，再用query方法与数据库连接执行这个语句*/
    let sql=insertSql('t_playerinfo',data);   //调用insertSql方法 拼接完成的sql语句。  //sql = 完整的数据库插入语句
    //let sql='insert into t_playerinfo (unique_id,uid,nick_name,avatar_url,house_card_count) values(' + data.uniqueID  + ',' +data.uid+ ')'
    console.log('sql = ' + sql)
    query(sql,function(err,res){
       if (err){
           console.log('insert player info err = ' + err);
       }else{
           console.log('insert player info success = ' + JSON.stringify(res));
       }
    })
};
/**从db里面传来的  updatePlayerInfo参数*/
exports.updatePlayerInfo=function (mainKey,mainValue,data) {
    /**把data放到updateSql方法中进行拼接，返回拼接完成的数据库更新语句赋值给sql，再用query方法与数据库连接执行这个语句*/
    let  sql=updateSql('t_playerinfo ',mainKey,mainValue,data);
    query(sql,function (err,data) {
        if (err){
            console.log('update player info err 1111= ' + err)
        }else{
            console.log('update player info success 22222= ' + JSON.stringify(data));
        }
    })
}
