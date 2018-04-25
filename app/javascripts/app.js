// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/High_low_2.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

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

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

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
      self.broker_list();
      self.totalbroker_list();
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
        /*broker: function() {
          var self = this;
          $("#user_page").hide();
          $("#broker_page").show();
            },*/
      broker: function() {
          var self = this;
     
          var meta;
          MetaCoin.deployed().then(function(instance) {
            meta = instance;
            return meta.check_broker({from: account});
          }).then(function(value) {
            console.log(value);
           if(value==true)
           {
            
            $("#user_page").hide();
            $("#broker_page").show();
           }
           else
           {
           
            meta.length_of_broker_addresses().then(function(val){
              if(val<5)
              {
                var txt;
                var r = confirm("Do you want to join as a broker?");
                if (r == true) {
                App.addbroker();
                } 
            }})
           }
          }).catch(function(e) {
            console.log(e);
           
          });
        },
        addbroker: function() {
          var self = this;
      
          var meta;
          MetaCoin.deployed().then(function(instance) {
            meta = instance;
            return meta. add_broker({from: account,gas: 6000000});
          }).then(function(value) {
          
          }).catch(function(e) {
            console.log(e);
            self.setStatus("Error getting balance; see log.");
          });
        },

  basicfunctions : function(){
    $("#account").val(account)
    
    web3.eth.getBalance(account, (err, balance) => {
      balance = web3.fromWei(balance, "ether") + ""
      $("#balance").val(balance.trim())
      $("#balance1").val(balance.trim())
    });
  },
  
  tokenvalue: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.balanceOf(account, {from: account});
    }).then(function(value) {
      parseFloat
      $("#usertoken").val(web3.fromWei(value, 'ether'))
      $("#brokertoken").val(web3.fromWei(value, 'ether'))
    }).catch(function(e) {
      console.log(e);
     
    });
  },
  user_table : function() {
    var self = this;
    var meta;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#user_table").html('')
     MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.get_better_betted_bets_length({from: account});
    }).then(function(val1) {
      for(var i=0;i<val1.toNumber();i++)
      {
        meta.better_betted_bets(account,i).then(function(val2){
        meta.bet_creator(val2).then(function(val3){ 
      meta. index_of_broker_bet(val2).then(function(val4,err){
        meta.bet_details_map(val3,val4).then(function(data,err){
          meta.bet_status_map(data[0]).then(function(data1,err){
            meta. game_id_map_better(account,data[0]).then(function(data2,err){
              meta. high_betters(data[0]).then(function(data3,err){
                meta.low_betters(data[0]).then(function(data4,err){
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
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td><button type="button" class="button"  data-toggle="modal" onclick="App.pval('+data[0]+');" data-target="#increasebet" >Increase Bet</td><td><button type="button" data-toggle="modal" data-target="#exitbet"  onclick="App.pval('+data[0]+');" class="button" >Exit</td></tr>');
              $("#user_table").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"No Of Token:"+'</td><td>'+web3.fromWei(data2[1]*1000, 'ether')+'</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#user_table").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td><button type="button" class="button"  data-toggle="modal" onclick="App.pval('+data[0]+');" data-target="#increasebet" >Increase Bet</td><td><button type="button" data-toggle="modal" data-target="#exitbet"  onclick="App.pval('+data[0]+');" class="button" >Exit</td></tr>');
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
    }
  
    });
  },
  totalbroker_list:function(){
    var self = this;
    var meta;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#broker_list").html('')
     MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.length_of_broker_addresses();
    }).then(function(val1) {
      for(var a=0;a<val1.toNumber();a++)
      {
        meta.get_broker_address(a).then(function(val2){
      meta. broker_created_bets(val2).then(function(val,err){
       for(var i=val.toNumber();i>=1;i--)
       {
        meta.bet_details_map(val2,i).then(function(data,err){
          meta.bet_status_map(data[0]).then(function(data1,err){
            meta. high_betters(data[0]).then(function(data3,err){
              meta.low_betters(data[0]).then(function(data4,err){
                meta. game_id_map_better(account,data[0]).then(function(data2,err){
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
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[1]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button" data-toggle="modal" style="padding: 3px 50px;" data-target="#bet" class="button"  onclick="App.pval('+data[0]+','+data[4]+');" >Bet</button></td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

          }
            else{
              $("#totalbroker_list").append('<tr><td rowspan="1">'+data[0]+'</td><td>'+data[1]+"/"+data[2]+'</td><td>'+data[2]+'</td><td>'+new Date(data[4].toNumber()*1000).toLocaleString()+'</td><td>'+new Date(data[5].toNumber()*1000).toLocaleString()+'</td><td style="color:green">'+data3+" &#9650;"+'</td><td style="color:red">'+data4+"&#9660;"+'</td><td> <button type="button" data-toggle="modal" style="padding: 3px 50px;" data-target="#bet" class="button"  onclick="App.pval('+data[0]+','+data[4]+');" >Bet</button></td></tr>');
              $("#totalbroker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>Active</td><td>'+"Bet Result:"+'</td><td>Pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

            }
        }
        });
          });
        });              
          });  
          });
        }
      });
    });
    }
    });
  },
  pval:function (pass,time)
  {
 
  passvalue=pass;
  passtime=time;
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
      var meta;
      MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.balanceOf(account,{from:account,gas: 6000000 });
      }).then(function(val) {
        if(bettime<=date)
        {
        if(val>bettokeninwei)
        {
        meta. betting(betid,choice,web3.toWei(bettokeninwei, 'ether'),{from:account,gas: 6000000 }).then(function(data2,err){
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
      }).catch(function(e) {
        console.log(e);
       
      });
    },
  //increse betting popup
  
  better_increase_bet_tokens : function() {
    var self = this;
  
  var betid = parseInt(passvalue);
  var incresetoken = document.getElementById('onlynum').value*0.001;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.better_increase_bet_tokens(betid, web3.toWei(incresetoken, 'ether'),{from:account,gas: 6000000 });
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
     
    });
  },
  //exit bet
  better_exit_bet : function() {
    var self = this;
  var betid = parseInt(passvalue);
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.better_exit_bet(betid,{from:account,gas: 6000000});
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
     
    });
  },
  //  purchase token
  buy_token : function() {
    var self = this;
    var meta;
    var num1 = parseFloat(document.getElementById('num').value)*0.001;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.buy_token({from:account,value: web3.toWei(num1,'ether'),gas: 6000000});
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
     
    });
  },
  // sell token
   exchange_token : function() {
    var self = this;
  var covertTokentoEther = parseFloat(document.getElementById('selltk').value) *0.001;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.exchange_token( web3.toWei(covertTokentoEther),{from:account,gas: 6000000});
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
     
    });
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
    var meta;
    var date=new Date().toLocaleString();
    date = parseInt(Math.round(new Date(date))/1000.0);
    $("#broker_list").html('')
     MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.broker_created_bets(account);
    }).then(function(val) {
       for(var i=val.toNumber();i>=1;i--)
       {
        meta.bet_details_map(account,i).then(function(data,err){
          meta.bet_status_map(data[0]).then(function(data1,err){
            meta. high_betters(data[0]).then(function(data3,err){
              meta.low_betters(data[0]).then(function(data4,err){
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
              if(a==0)
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

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.broker_stop_bet(stopbetid, {from: account,gas: 6000000});
    }).then(function(value) {
     
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },
  
  declarebet: function() {
    var self = this;
    var result=  parseInt($("input[name='gender']:checked").val().trim());
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.broker_setting_result_and_distribute_money(declarebetid, result, {from: account,gas: 6000000});
    }).then(function(value) {
     
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },
  create_bet: function() {
    var self = this;

    var teamA = document.getElementById("a").value;
    var teamB = document.getElementById("b").value;
    var etime = $("#edate").val();
    etime = parseInt(Math.round(new Date(etime))/1000.0);
    var etime1 = $("#edate1").val();
    etime1 = parseInt(Math.round(new Date(etime1))/1000.0);
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.broker_set_game(teamA,teamB,select,etime,etime1,{from: account,gas: 6000000});
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
    });
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