// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
//import { default as Web3} from 'web3';
var web3;
if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
}

import { default as contract } from 'truffle-contract'
import { error } from "util";

// Import our contract artifacts and turn them into usable abstractions.
//import metacoin_artifacts from '../../build/contracts/High_low_2.json'
var abiJSON = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bet_creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "add_broker", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "check_broker", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bet_status_map", "outputs": [ { "name": "is_bet_stopped", "type": "bool" }, { "name": "is_result_published", "type": "bool" }, { "name": "final_option", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "bet_id", "type": "uint256" }, { "name": "_increase_tokens_in_wei", "type": "uint256" } ], "name": "better_increase_bet_tokens", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_better_betted_bets_length", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "bet_details_map", "outputs": [ { "name": "bet_id", "type": "uint256" }, { "name": "team_1", "type": "string" }, { "name": "team_2", "type": "string" }, { "name": "team_selecetd", "type": "bool" }, { "name": "start_time", "type": "uint256" }, { "name": "expiry_time", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "better_betted_bets", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "low_betters", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "high_betters", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "account_token_balance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "contract_token_balance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "contract_ether_balance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bet_tokens_for_low", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "broker_addresses", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "name": "betters_of_bet_id", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "check_better", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "tokens_to_exchange_in_wei", "type": "uint256" } ], "name": "exchange_token", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bet_tokens_for_high", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "bet_id", "type": "uint256" }, { "name": "result_options", "type": "uint256" } ], "name": "broker_setting_result_and_distribute_money", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "bet_id", "type": "uint256" }, { "name": "_choice", "type": "uint256" }, { "name": "_bet_tokens_in_wei", "type": "uint256" } ], "name": "betting", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "buy_token", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "bet_id", "type": "uint256" } ], "name": "broker_stop_bet", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "index_of_broker_bet", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "is_exit", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "is_better", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "broker_created_bets", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "length_of_broker_addresses", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "game_id_map_better", "outputs": [ { "name": "option", "type": "bool" }, { "name": "betted_tokens", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "get_broker_address", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "is_broker", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_bet_id", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "bet_id", "type": "uint256" } ], "name": "better_exit_bet", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_team_1", "type": "string" }, { "name": "_team_2", "type": "string" }, { "name": "_team_selecetd", "type": "bool" }, { "name": "_start_time", "type": "uint256" }, { "name": "_expiry_time", "type": "uint256" } ], "name": "broker_set_game", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "indexed_from", "type": "address" }, { "indexed": false, "name": "indexed_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "indexed_owner", "type": "address" }, { "indexed": false, "name": "indexed_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_sender", "type": "address" }, { "indexed": false, "name": "_receiver", "type": "address" }, { "indexed": false, "name": "_transfer_amount", "type": "uint256" } ], "name": "Transfer_amount", "type": "event" } ];


// MetaCoin is our usable abstraction, which we'll use through the code below.
//var MetaCoin = contract(metacoin_artifacts);
var MyContract = web3.eth.contract(abiJSON);
var _address = "0xb483122573faa5335bd7be228a15c41ee9d92834";
var _contracInstance = MyContract.at(_address);


// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var select;
var stopbetid;
var declarebetid;
var passvalue;
var passtime;
window.App = {
  start: function() {
    var self = this;
    console.log("inside aapp ");
    // Bootstrap the MetaCoin abstraction for Use.
    //MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      // self.broker_list();
      // self.totalbroker_list();
      self.sri();
      self.basicfunctions();
      self.user_table();
      self.tokenvalue();  
    //  self.refreshBalance();
    });
  },
  user: function() {
   var self = this;
    $("#user_page").show();
      $("#broker_page").hide();
     },
     user1: function() {
      var self = this;
       $("#user_page").show();
         $("#broker_page").hide();
        },
        broker: function() {
          var self = this;

          _contracInstance.check_broker({from: account},
            function(err,value) {
              console.log("err   ",err);
              console.log("value   ",value);
              if(err){
                console.log("broker  ::",err);
              }
              if(value)
              {
                console.log("value inside   ",value);
                $("#user_page").hide();
                $("#broker_page").show();
              }
              else{
                console.log("value inside 2  ",value);
              _contracInstance.length_of_broker_addresses(function(error,val){
              if(error){
                console.log("error inside broker method ",error);
                return;
              }
              if(val<5)
              {
                var txt;
                var r = confirm("Do you want to join as a broker?");
                if (r == true) {
                App.addbroker();
                } 
            }});
           }
          });
        },
        addbroker: function() {
          var self = this;
      
          _contracInstance.add_broker.sendTransaction({from: account,gas: 4682508},function(error,value) {
            if (error) {
              console.log("error in addBroker method",error);
              return;
            }
            else{
              console.log("value of addbroker  ",value);
            }       
          })
        },

  basicfunctions : function(){
    $("#account").val(account)
    
    web3.eth.getBalance(account, (err, balance) => {
      balance = web3.fromWei(balance, "ether") + ""
      $("#balance").val(balance.trim())
      console.log("balance :: ",balance);
      //$("#balance1").val(balance.trim())
    });
  },
  
  tokenvalue: function() {
    var self = this;

    var meta;
    _contracInstance.balanceOf(account, {from: account},
      function(error,value) {
        if(error){
          console.log("brokertoken error  ",error);
          return;
        }
        else{
          console.log("brokertoken value ::",value);
          $("#usertoken").val(web3.fromWei(value, 'ether'))
          $("#brokertoken").val(web3.fromWei(value, 'ether'))
        }
    })
  },
  user_table : function() {
    var self = this;
    var meta;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#user_table").html('')
     _contracInstance.get_better_betted_bets_length({from: account},
      function(error,val1) {
      if(error){
         console.log("#user_table  ",error);
         return;
       }
      else{
      //for(var i=0;i<val1.toNumber();i++)
      for(var i=0;i<val1;i++)
      {
        _contracInstance.better_betted_bets.sendTransaction(account,i,function(val2){
          _contracInstance.bet_creator.sendTransaction(val2,function(val3){ 
            _contracInstance.index_of_broker_bet.sendTransaction(val2,function(val4,err){
              _contracInstance.bet_details_map.sendTransaction(val3,val4,function(data,err){
                _contracInstance.bet_status_map.sendTransaction(data[0],function(data1,err){
                  _contracInstance.game_id_map_better.sendTransaction(account,data[0],function(data2,err){
                    _contracInstance.high_betters.sendTransaction(data[0],function(data3,err){
                      _contracInstance.low_betters.sendTransaction(data[0],function(data4,err){
            var a=parseInt(data1[2]);
            if(data2[1]>0)
          {
            if(data1[0]==true)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data2[0]==true)
                {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }  
              else if(data2[0]==false)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }          
              }
              if(a==11)
              {
                if(data2[0]==true)
                {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }  
              else if(data2[0]==false)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }               
               }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              
              }
            }
           else if(data[5]<date)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data2[0]==true)
                {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }  
              else if(data2[0]==false)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }          
              }
              if(a==11)
              {
                if(data2[0]==true)
                {
                  if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }  
              else if(data2[0]==false)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                } 
              }               
               }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }           
            }
          }
           else
           if(data[3]==false)
            {
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td><button type="button" class="button"  data-toggle="modal" onclick="App.pval('+data[0]+','+web3.fromWei(data2[1]*1000, 'ether')+');" data-target="#increasebet" >Increase Bet</td><td><button type="button" data-toggle="modal" data-target="#exitbet"  onclick="App.pval('+data[0]+');" class="button" >Exit</td></tr>');
              $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td><button type="button" class="button"  data-toggle="modal" onclick="App.pval('+data[0]+','+web3.fromWei(data2[1]*1000, 'ether')+');" data-target="#increasebet" >Increase Bet</td><td><button type="button" data-toggle="modal" data-target="#exitbet"  onclick="App.pval('+data[0]+');" class="button" >Exit</td></tr>');
              $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            }    
          }
          else
          {

            if(data[3]==false)
            {
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
              $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Exit</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>-----</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
              $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Exit</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>------</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            }    
          }            
          });  
        });
      });
    });
          });
        
        });
      });
    });
    }}  
    });
  },
  totalbroker_list:function(){
    var self = this;
    var meta;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#broker_list").html('')
     _contracInstance.length_of_broker_addresses(function(error,val1) {
       if(error){
         console.log("#broker_list  ::",error);
         return;
       }
       else{
       var x=val1;
       console.log(x,"...xxx....")
       for(var a=0;a<x;a++){
        _contracInstance.get_broker_address(a,
          function(val2){
                _contracInstance.broker_created_bets.sendTransaction(val2,function(val,err){
       for(var i=val;i>=1;i--)
       {
        _contracInstance.bet_details_map.sendTransaction(val2,i,function(data,err){
          _contracInstance.bet_status_map.sendTransaction(data[0],function(data1,err){
            _contracInstance.high_betters.sendTransaction(data[0],function(data3,err){
              _contracInstance.low_betters.sendTransaction(data[0],function(data4,err){
                _contracInstance.game_id_map_better.sendTransaction(account,data[0],function(data2,err){
                  _contracInstance.is_exit.sendTransaction(account,data[0],function(data5,err){
            var a=parseInt(data1[2]);
            if(data2[1]>0)
            {
            if(data1[0]==true)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              
              }
            }
           else if(data[5]<date)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }           
            }
          }
            else 
            if(data[3]==false)
            {
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            } 
          }
          else if(data2[1]<=0&&data5==false)
          {
            if(data1[0]==true)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              
              }
            }
           else if(data[5]<date)
            {
              if(a==0)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                  $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                  $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }           
            }
          }
            else 
            if(data[3]==false)
            {
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button" data-toggle="modal" style="padding: 3px 50px;" data-target="#bet" class="button"  onclick="App.pval('+data[0]+','+data[4]+');" >Bet</button></td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button" data-toggle="modal" style="padding: 3px 50px;" data-target="#bet" class="button"  onclick="App.pval('+data[0]+','+data[4]+');" >Bet</button></td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            }
        }
        else 
        {
          if(data1[0]==true)
          {
            if(a==0)
            {
              if(data[3]==false)
              {
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }
            }
            if(a==10)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }              }
            if(a==11)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }              }
            if(a==12)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }              
            }
          }
         else if(data[5]<date)
          {
            if(a==0)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }
            }
            if(a==10)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }              }
            if(a==11)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }              }
            if(a==12)
            {
              if(data[3]==false)
              {
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
            }
              else{
                $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  
              }           
          }
        }
          else 
          if(data[3]==false)
          {
            $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
            $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

        }
          else{
            $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
            $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
      }
      });
        });
          });
        });              
          });  
          });
        }
      });
    });
    }
  }
    });
  },
  pval:function (pass,time)
  {
 
  passvalue=pass;
  passtime=time;
  $("#inccbet").val(passtime);
  },
  //betting popup
  betting : function() {
      var self = this;
  
  var betid = parseInt(passvalue);
  var bettime = parseInt(passtime);
  var choice = $("input[name='optradio']:checked").val();
  var bettokeninwei = document.getElementById('incbet').value*0.001;
  var date=new Date().toLocaleString();
  date = parseInt(Math.round(new Date(date))/1000.0);
      // var meta;
      _contracInstance.balanceOf(account,{from:account,gas: 6000000 },
        function(error,val) {
          if(error){
            console.log("betting ::",error)
          }
          else{
        if(bettime<=date)
        {
        if(val>bettokeninwei)
        {
          _contracInstance.betting.sendTransaction(betid,choice,web3.toWei(bettokeninwei, 'ether'),{from:account,gas: 6000000 },function(data2,err){
        })
      }
      else{
        alert("Insuficent Token Balance");
      }
    }
    else
    {
      alert("You Need To Wait Upto Start Time");
    }
  }
})
      // .catch(function(e) {
      //   console.log(e);
       
      // });
    },
  //increse betting popup
  
  better_increase_bet_tokens : function() {
    var self = this;
  
  var betid = parseInt(passvalue);
  var incresetoken = document.getElementById('onlynum').value*0.001;
    _contracInstance.game_id_map_better.sendTransaction(account,betid,
      function(error,data1) {
        if(error){
          console.log("better_increase_bet_tokens  ::",error);
          return;
        }
        else{
        $("#incbet").val(web3.fromWei(data1[1]*1000, 'ether'))
        _contracInstance.better_increase_bet_tokens.sendTransaction(betid, web3.toWei(incresetoken, 'ether'),{from:account,gas: 6000000 });
        }
    })
    // .catch(function(e) {
    //   console.log(e);
     
    // });
  },
  //exit bet
  better_exit_bet : function() {
    var self = this;
    var betid = parseInt(passvalue);
    _contracInstance.better_exit_bet.sendTransaction(betid,{from:account,gas: 4653035},
      function(error) {
        if(error){
          console.log("better exit bet  ::",error);
          return;
        }
      
    })
    // .catch(function(e) {
    //   console.log(e);
     
    // });
  },
  //  purchase token
  buy_token : function() {
    var self = this;
    var meta;
    var num1 = parseFloat(document.getElementById('num').value)*0.001;
    _contracInstance.buy_token.sendTransaction({from:account,value: web3.toWei(num1,'ether'),gas: 4653035},
    function(err) {
      if(err){
        console.log("buy_token.sendTransaction   :::",err);
        return;
      }
    })
    // .catch(function(e) {
    //   console.log(e);
     
    // });
  },
  // sell token
   exchange_token : function() {
    var self = this;
  var covertTokentoEther = parseFloat(document.getElementById('selltk').value) *0.001;
    _contracInstance.exchange_token.sendTransaction( web3.toWei(covertTokentoEther),{from:account,gas: 6000000},
    function(err) {
      if(err){
        console.log("error in converting  ",error);
        return;
      }      
    })
    // .catch(function(e) {
    //   console.log(e);
     
    // });
  },
  myFunction: function(m) {
    document.getElementById("a").disabled = true;
    document.getElementById("b").disabled = true;
    document.getElementById("button2").disabled = true;
     select =m.value;
  },
  myFunction1: function(m) {
  document.getElementById("a").disabled = true;
  document.getElementById("b").disabled = true;
  document.getElementById("button1").disabled = true;
   select =m.value;
  },  
  stop_bet: function(m) {
     stopbetid =parseInt(m);
  },  
  declare_bet: function(m) {
    declarebetid =parseInt(m);
   },
  broker_list:function(){
   
    var self = this;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#broker_list").html('')
     _contracInstance.broker_created_bets.sendTransaction(account,
      function(error,val) {
        if(error){
          console.log("#broker_list  ",error );
          return;
        }
        else{
        for(var i=val;i>=1;i--)
        {
        _contracInstance.bet_details_map.sendTransaction(account,i,function(data,err){
          _contracInstance.bet_status_map.sendTransaction(data[0],function(data1,err){
            _contracInstance.high_betters.sendTransaction(data[0],function(data3,err){
              _contracInstance.low_betters.sendTransaction(data[0],function(data4,err){
            var a=parseInt(data1[2]);
             if(data1[0]==true)
            {
              if(a==0&&data[5]<date)
              {
               
                if(data[3]==false)
                {
                 
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+data[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+data[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==0&&data[5]>date)
              {
               
                if(data[3]==false)
                {
                 
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
                
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
              
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              
              }
            }
           else if(data[5]<date)
            {
             
              if(a==0)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+data[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 50px;"  onclick="App.declare_bet('+data[0]+');" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }
              }
              if(a==10)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Loss</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==11)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Won</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }              }
              if(a==12)
              {
                if(data[3]==false)
                {
                $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
                $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
              }
                else{
               $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td></tr>');
               $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>closed</td><td>'+"Bet Result:"+'</td><td>Draw</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
                }           
            }
          }
            else 
            if(data[3]==false)
            {
             
            $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 60px;" data-toggle="modal" onclick="App.stop_bet('+data[0]+');" data-target="#myModal1">Stop Bet</button></td></tr>');
            $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
           $("#broker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button"  style="padding: 3px 60px;" data-toggle="modal" onclick="App.stop_bet('+data[0]+');" data-target="#myModal1">Stop Bet</button></td></tr>');
           $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            }   
          });
        });            
           });  
          });
        }
      }
    });
  },
 /*() broker_list:function()
{
  
  var self= this;
  $("#broker_list").html('');
  for(var i=0;i<10;i++)
  {
    $("#broker_list").append('<tr><td rowspan="1">'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td style="color:green">'+i+" &#9650;"+'</td><td style="color:red">'+i+"&#9660;"+'</td><td> <button type="button"  style="padding: 8px 60px;" data-toggle="modal" data-target="#myModal1"><center>Stop Bet</button></td><td> <button type="button"  style="padding: 8px 50px;" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');

    $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>active</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');    
  }
 
},*/
sri:function()
{
  var self= this;
 // 
 //$("#sri").append('<tr><td>'+"status:"+'</td><td><input type="textbox" value="Active" class="mytxt" readonly></td><td>'+"No.of.Tokens:"+'</td><td><input type="textbox" value="10" class="mytxt" readonly></td><td>Won/Lost: &nbsp;&nbsp;&nbsp;</td><td><input type="textbox"class="mytxt" value="won" readonly></td><td></td><td></td><td></td><td></td></tr>');
  $("#sri2").html('');
 // $("#sri").append('<table><thead><tr><th>BetId</th><th>Details</th><th>Team</th><th>Start Time/Date</th><th>End Time/Date</th><th>High</th><th>Low</th><th> </th><th> </th><th> </th></tr></thead><tbody id="sri"></tbody></table>');
  
 
   for(var i=0;i<10;i++)
  {
    
    $("#sri").append('<tr><td rowspan="1">'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td style="color:green">'+i+"&#9650"+'</td><td class="glyphicon glyphicon-triangle-bottom" style="color:red">'+i+'</td><td><button type="button" data-toggle="modal" data-target="#bet" class="button"  onclick="App.pval('+i+');" >Bet</td><td><button type="button" class="button"  data-toggle="modal" onclick="App.pval('+i+');" data-target="#increasebet" >Increase Bet</td><td><button type="button" data-toggle="modal" data-target="#exitbet"  onclick="App.pval('+i+');" class="button" >Exit</td></tr>');
    $("#sri").append('<tr style="background:whitesmoke"><td>'+"status:"+'</td><td>Active</td><td>'+"No.of.Tokens:"+'</td><td>10</td><td>Won/Lost</td><td>won</td><td></td><td></td><td></td><td></td></tr>');
  
  }
  
},
  stopbet: function() {
    var self = this;

    _contracInstance.broker_stop_bet.sendTransaction(stopbetid, {from: account,gas: 6000000},
      function(error,value) {
        if(error){
          console.log("stopbet error  ::",error);
          self.setStatus("Error getting balance; see log.");
          return;
        }     
    })
    // .catch(function(e) {
    //   console.log(e);
    //   self.setStatus("Error getting balance; see log.");
    // });
  },
  
  declarebet: function() {
    var self = this;
    var result=  parseInt($("input[name='gender']:checked").val().trim());
    _contracInstance.broker_setting_result_and_distribute_money.sendTransaction(declarebetid, result, {from: account,gas: 6000000},
      function(error,value) {
        if(error){
          console.log("declarebet error  ::",error);
          self.setStatus("Error getting balance; see log.");
          return;
        }
     
    })
    // .catch(function(e) {
    //   console.log(e);
    //   self.setStatus("Error getting balance; see log.");
    // });
  },
  create_bet: function() {
    var self = this;

    var teamA = document.getElementById("a").value;
    var teamB = document.getElementById("b").value;
    var etime = $("#edate").val();
    etime = parseInt(Math.round(new Date(etime))/1000.0);
    var etime1 = $("#edate1").val();
    etime1 = parseInt(Math.round(new Date(etime1))/1000.0);
    _contracInstance.broker_set_game.sendTransaction(teamA,teamB,select,etime,etime1,{from: account,gas: 4653035},
      function(error,value) {
        if(error){
          console.log("create_bet  ::",error);
          return;
        }
        else{
          console.log("value for broker set",value)
        }
    })
    // .catch(function(e) {
    //   console.log(e);
    // });
  }
};
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});