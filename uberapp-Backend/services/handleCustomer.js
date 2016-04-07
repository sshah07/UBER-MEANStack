/**
 * New node file
 */

var session = require('client-sessions');

var mysql = require('../services/mysql');

var redis = require('redis');
var client = redis.createClient();

function handle_request_showCustomer(msg,callback){
	
var res = {};
	
	var getUser="select * from customer_signup where c_flag = 1 order by c_id"; 
	  console.log("in login js "+getUser);
	  //set = {c_emailid:email,c_password:password}
	  mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
					console.log("error"+set);
				}
			else
				{
				console.log("results"+results);
					if(results.length > 0)
						{
						//req.session.data=results;
						console.log("valid in select");
						res.statusCode=200;
						res.data=results;
						}
					else 
						{
							console.log("error");
							res.statusCode=401;
						}

				}callback(null,res);
		},getUser);
}


function handle_request_addCustomer(msg,callback){
	
	/*var res = {};
	var getUser="select * from driver_signup where d_flag = 0 order by d_id"; 
	console.log("Query is:"+getUser);	
	mysql.fetchData(function(err,results){
					if(!err){
					console.log("Successfully Fetched!");
					console.log("json output..."+JSON.stringify(results));
					res.statusCode=200;
					res.data=JSON.stringify(results);
					res.send({"result":JSON.stringify(results)});
					        }
					        else {
					        	 console.log(err);
					        	res.statusCode=401;
					           
					        }  
				}
		,getUser);*/
	
	
var res = {};
	
	var getUser="select * from customer_signup where c_flag = 0 order by c_id"; 
	  console.log("in login js "+getUser);
	  //set = {c_emailid:email,c_password:password}
	  mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
					console.log("error"+set);
				}
			else
				{
				console.log("results"+results);
					if(results.length > 0)
						{
						//req.session.data=results;
						console.log("valid in select");
						res.statusCode=200;
						res.data=results;
						}
					else 
						{
							console.log("error");
							res.statusCode=401;
						}

				}callback(null,res);
		},getUser);
}

function handle_request_approvecustomer(msg,callback){
var c_id = msg.c_id;
var res = {};
var query2 = "update customer_signup set c_flag = 1 where c_id = '"+c_id+"' " ;
	//var getUser="select * from driver_signup where d_flag = 0 order by d_id"; 
	  console.log("in login js approvecustomer"+query2);
	  //set = {c_emailid:email,c_password:password}
	  mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
					console.log("error"+set);
				}
			else
				{
				/*console.log("results"+results);
					if(results.length > 0)
						{
						//req.session.data=results;
	*/						console.log("valid in select");
							res.statusCode=200;
							client.del('select * from customer_signup where c_flag=0');
							console.log("Cache UpdateCustomer Delete");
							
							/*res.data=results;*/
						/*}
					else 
						{
							console.log("error");
							res.statusCode=401;
						}*/

				}callback(null,res);
		},query2);
}


function handle_request_denycustomer(msg,callback){
	var c_id = msg.c_id;
	console.log("msgd_id"+c_id);
	var res = {};
	var query2 = "delete from customer_signup where c_id = '"+c_id+"' " ;
		//var getUser="select * from driver_signup where d_flag = 0 order by d_id"; 
		  console.log("in login js deletedriver"+query2);
		  //set = {c_emailid:email,c_password:password}
		  mysql.fetchData(function(err,results){
				if(err)
					{
						throw err;
						console.log("error");
					}
				else
					{
					/*console.log("results"+results);
						if(results.length > 0)
							{
							//req.session.data=results;
		*/						console.log("valid in select");
								res.statusCode=200;
								/*res.data=results;*/
							/*}
						else 
							{
								console.log("error");
								res.statusCode=401;
							}*/

					}callback(null,res);
			},query2);
	}


function handle_request_customerreview(msg,callback){
	
	var res = {};
	var getUser="select * from uberapp.customer_signup as ds left join (select avg(ratings) as rating,c_id from uberapp.customer_ratings  group by c_id) as dr on dr.c_id = ds.c_id where ds.c_flag=1 ";
	
		console.log("Query isdriverview:"+getUser);	
		  mysql.fetchData(function(err,results){
				if(err)
					{
						throw err;
						console.log("error");
					}
				else
					{
					console.log("results"+results);
						if(results.length > 0)
							{
							//req.session.data=results;
							console.log("valid in select"+JSON.stringify(results));
								res.statusCode=200;
								res.data=results;
							}
						else 
							{
								console.log("error");
								res.statusCode=401;
							}

					}callback(null,res);
			},getUser);
	}


exports.handle_request_customerreview = handle_request_customerreview;
exports.handle_request_showCustomer = handle_request_showCustomer;
exports.handle_request_denycustomer=handle_request_denycustomer;
exports.handle_request_approvecustomer=handle_request_approvecustomer;
exports.handle_request_addCustomer = handle_request_addCustomer;