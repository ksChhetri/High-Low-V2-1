pragma solidity ^0.4.0;
library SafeMath 
{
    function add(uint a, uint b) internal pure returns (uint) 
    {
        uint c;
        c = a + b;
        require(c >= a);
        return c;
    }
    
    function sub(uint a, uint b) internal pure returns (uint) 
    {
        require(b <= a);
        uint c;
        c = a - b;
        return c;
    }
    
    function mul(uint a, uint b) internal pure returns (uint) 
    {
        uint c;
        c = a * b;
        require(a == 0 || c / a == b);
        return c;
    }
    
    function div(uint a, uint b) internal pure returns (uint) 
    {
        require(b > 0);
        uint c;
        c = a / b;
        return c;
    }
    
}

contract High_low_2
{
    
    using SafeMath for uint;
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public _totalSupply;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    
    
    function High_low_2() public payable
    {
        symbol = "HLT";
        name = "High Low Token";
        decimals = 18;
        _totalSupply = 10000000 * 10**uint(decimals);
        balances[this]= _totalSupply;
    }

    event Transfer(address indexed_from, address indexed_to, uint256 _value);
    
    event Approval(address indexed_owner, address indexed_spender, uint256 _value);
    
    function totalSupply() public constant returns (uint256) 
    {
        return _totalSupply;
    }

    function balanceOf(address _owner) public constant returns (uint256) 
    {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public payable returns (bool) 
    {
        require(balances[msg.sender] >= _value &&  _value > 0);
        balances[msg.sender] = balances[msg.sender].sub(_value);//calling library
        balances[_to] = balances[_to].add(_value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public payable returns (bool) 
    {
        require(balances[_from] >= _value && _value > 0);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public payable returns (bool) 
    {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant returns (uint256) 
    {
        return allowed[_owner][_spender];
    }
    
    
    //high low functionalities start here
    
    event Transfer_amount(address _sender, address _receiver, uint256 _transfer_amount);
    
    function buy_token() public payable returns(bool)
    {
        return transferFrom(this, msg.sender, msg.value*1000);
    }
    
    function exchange_token(uint256 tokens_to_exchange_in_wei) public payable returns(bool)
    {
        transferFrom(msg.sender, this, tokens_to_exchange_in_wei*1000);
        msg.sender.transfer(tokens_to_exchange_in_wei);
        Transfer_amount(this, msg.sender, tokens_to_exchange_in_wei);
        return true;
    }
    
    function account_token_balance() public constant returns(uint256)
    {
        return balanceOf(msg.sender);
    }
    
    function contract_ether_balance() public constant returns(uint256)
    {
        return address(this).balance;
    }
    
    function contract_token_balance() public constant returns(uint256)
    {
        return balanceOf(this);       
    }
    
    uint256 public _bet_id;
    
    address[] public broker_addresses;

    mapping(address=>bool) public is_broker;
    
    mapping(address=>bool) public is_better;
    
    struct bet_details
    {
        uint256 bet_id;
        string team_1;
        string team_2;
        bool team_selecetd;
        uint256 start_time;
        uint256 expiry_time;
    }
    mapping(address=>mapping(uint256=>bet_details)) public bet_details_map; // key 1: broker_address key2:broker_bets(iterate this)
    
    mapping(uint256=>uint256) public index_of_broker_bet;//key:bet_id  value: index_of_broker_bet(broker_created_bets)
    
    mapping(address=>uint256) public broker_created_bets;// total bet created by that particular broker (5)
    
    mapping(uint256=>address) public bet_creator;
    
    struct better
    {
        bool option;
        uint256 betted_tokens;
    }
    mapping(address=>mapping(uint256=>better)) public game_id_map_better;//key: index  value:betting     
    
    mapping(uint256=>address[]) public betters_of_bet_id;
    
    mapping(address=>uint256[]) public better_betted_bets;
    
    mapping(uint256=>uint256) public bet_tokens_for_low;
    
    mapping(uint256=>uint256) public bet_tokens_for_high; 
    
    mapping(uint256=>uint256) public low_betters;
    
    mapping(uint256=>uint256) public high_betters;

    function get_better_betted_bets_length() public constant returns(uint256)
    {
        return better_betted_bets[msg.sender].length;
    }
    
    struct bet_status
    {
        bool is_bet_stopped;
        bool is_result_published; //to check is_result_published
        uint256 final_option; //10,11,12 
    }
    mapping(uint256=>bet_status) public bet_status_map; 
    
    function add_broker() public payable returns(bool)
    {
        require(!check_broker());
        require(length_of_broker_addresses()<6);
        broker_addresses.push(msg.sender);
        is_broker[msg.sender]=true;
        return true;
    }
    
    function check_broker() public constant returns(bool) // is_broker
    {
        return is_broker[msg.sender];
    }
    
    function length_of_broker_addresses() public constant returns(uint256)
    {
        return broker_addresses.length;
    }
    
    function get_broker_address(uint256 index) public constant returns(address)
    {
        return broker_addresses[index]; //index start from 0
    }
    
    function check_better() public constant returns(bool)
    {
        return is_better[msg.sender];    
    }
    
    function broker_set_game(string _team_1, string _team_2, bool _team_selecetd, uint256 _start_time, uint256 _expiry_time) public payable returns(bool) // newbet, new_game_id
    {
        require(_expiry_time>now && _start_time>(now-2 minutes) && _expiry_time>_start_time);
        require(is_broker[msg.sender]==true);
        _bet_id++;
        broker_created_bets[msg.sender]++;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].bet_id=_bet_id;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].team_1=_team_1;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].team_2=_team_2;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].team_selecetd=_team_selecetd;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].start_time=_start_time;
        bet_details_map[msg.sender][broker_created_bets[msg.sender]].expiry_time=_expiry_time;
        index_of_broker_bet[_bet_id]=broker_created_bets[msg.sender];
        bet_creator[_bet_id]=msg.sender;
        return true;
    }
    
    function betting(uint256 bet_id,uint256 _choice,uint256 _bet_tokens_in_wei) public payable returns(bool) // is_bet_success 
    {
        require(_bet_tokens_in_wei>0);
        require(balanceOf(msg.sender)>=_bet_tokens_in_wei*1000);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time>=now);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].start_time<=now);
        require(bet_status_map[bet_id].is_bet_stopped==false);
        require(game_id_map_better[msg.sender][bet_id].betted_tokens==0);
        require(_choice==1||_choice==0);
        
        transferFrom(msg.sender, this, _bet_tokens_in_wei*1000);
        game_id_map_better[msg.sender][bet_id].betted_tokens=_bet_tokens_in_wei;
        
        if(_choice==0)
        {
            game_id_map_better[msg.sender][bet_id].option=false;
            bet_tokens_for_low[bet_id]+=_bet_tokens_in_wei;
            low_betters[bet_id]++;
        }
        else if(_choice==1)
        {
            game_id_map_better[msg.sender][bet_id].option=true;
            bet_tokens_for_high[bet_id]+=_bet_tokens_in_wei;
            high_betters[bet_id]++;
        }
        
        betters_of_bet_id[bet_id].push(msg.sender);
        
        better_betted_bets[msg.sender].push(bet_id);
        if(is_better[msg.sender]==false)
        is_better[msg.sender]=true;//added as a user
        
        return true;
    }
    
    function broker_stop_bet(uint256 bet_id) public payable returns(bool) //is_bet_stopped
    {
        bet_status_map[bet_id].is_bet_stopped=true;
        return true;
    }
    
    function better_increase_bet_tokens(uint256 bet_id,uint256 _increase_tokens_in_wei) public payable returns(bool)// is_increase_success
    {
        require(game_id_map_better[msg.sender][bet_id].betted_tokens>0);
        require(bet_status_map[bet_id].is_bet_stopped==false);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time>=now);
        require(balanceOf(msg.sender)>=_increase_tokens_in_wei*1000);
        transferFrom(msg.sender,this,_increase_tokens_in_wei*1000);
        game_id_map_better[msg.sender][bet_id].betted_tokens+=_increase_tokens_in_wei;
        
        if(game_id_map_better[msg.sender][bet_id].option==false)
            bet_tokens_for_low[bet_id]+=_increase_tokens_in_wei;
        else if(game_id_map_better[msg.sender][bet_id].option==true)
            bet_tokens_for_high[bet_id]+=_increase_tokens_in_wei;
        
        return true;
    }
    
    function better_exit_bet(uint256 bet_id) public payable returns(bool)
    {
        require(game_id_map_better[msg.sender][bet_id].betted_tokens>0);
        require(bet_status_map[bet_id].is_bet_stopped==false);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time>=now);
        
        uint256 tokens_betted=game_id_map_better[msg.sender][bet_id].betted_tokens;
        game_id_map_better[msg.sender][bet_id].betted_tokens=0;
        transferFrom(this, msg.sender, (tokens_betted*1000*95)/100);
        transferFrom(this, bet_creator[bet_id], (tokens_betted*1000*5)/100);
        
        if(game_id_map_better[msg.sender][bet_id].option==false)
        {
            bet_tokens_for_low[bet_id]-=tokens_betted;
            low_betters[bet_id]--;
        }
        else if(game_id_map_better[msg.sender][bet_id].option==true)
        {
            bet_tokens_for_high[bet_id]+=tokens_betted;
            high_betters[bet_id]--;
        }
        return true;    
    }
    function broker_setting_result_and_distribute_money(uint256 bet_id,uint256 result_options) public payable returns(bool)
    {
        require(bet_creator[bet_id]==msg.sender);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time<=now);
        require(bet_status_map[bet_id].is_result_published==false);
        require(result_options<=12 && result_options>=10);  //10 ==low  11==high  12==draw
        
        
        bet_status_map[bet_id].is_result_published=true;
        bet_status_map[bet_id].final_option=result_options;
        //bool result_option;
        
        uint256 count = betters_of_bet_id[bet_id].length;
        
        if(result_options==12)
        {
            //draw
            while(count>0)
            {
                if(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens>0)
                {
                    transferFrom(this, betters_of_bet_id[bet_id][count-1], game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*1000);
                }
                count--;
            }
            return true;
        }
        else if(result_options==11)
        {
            //high setted as result 
            
            //uint256 low_high_ratio = ; 
            while(count>0)
            {
                if(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens>0 && game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].option==true)
                {
                    //betted tokens:   game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens
                    //low bet token:   bet_tokens_for_low[bet_id]
                    //high bet tokens: bet_tokens_for_high[bet_id]
                    //(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])
                    //((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])/bet_tokens_for_high[bet_id])
                    //(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens+((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])/bet_tokens_for_high[bet_id]))
                    //(1000*(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens+((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])/bet_tokens_for_high[bet_id])))
                    transferFrom(this, betters_of_bet_id[bet_id][count-1], (1000*(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens+((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])/bet_tokens_for_high[bet_id]))));
                    //game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].tokens_won=((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_low[bet_id])/bet_tokens_for_high[bet_id]);
                }
                count--;
            }
            return true;
        }
        
        else if(result_options==10)
        {
            //low setted as result 
            
            while(count>0)
            {
                if(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens>0 && game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].option==false)
                {
                    //betted tokens:   game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens
                    //low bet token:   bet_tokens_for_low[bet_id]
                    //high bet tokens: bet_tokens_for_high[bet_id]
                    //(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_high[bet_id])
                    //((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_high[bet_id])/bet_tokens_for_low[bet_id])
                    //(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens+((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_high[bet_id])/bet_tokens_for_low[bet_id]))
                    transferFrom(this, betters_of_bet_id[bet_id][count-1], (1000*(game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens+((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_high[bet_id])/bet_tokens_for_low[bet_id])))); 
                    //game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].tokens_won=((game_id_map_better[betters_of_bet_id[bet_id][count-1]][bet_id].betted_tokens*bet_tokens_for_high[bet_id])/bet_tokens_for_low[bet_id]);
                }
                count--;
            }
            return true;
        }
        return true;
    }
}