const db = {
	mysql_con: {
	    host: 'localhost',
	    user: 'root',
	    password: 'lyq199361',
	    database: 'game',
	    charset: "utf8"
	}
};

// export default db; 这样无法解构import
// 
// 

export const mysql_con = db.mysql_con;