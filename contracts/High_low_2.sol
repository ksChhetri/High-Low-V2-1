pragma solidity ^0.4.21;
import "./High_low_2_token.sol";
contract High_low_2
{
    High_low_2_token token_address;
    
    event Transfer_amount(address _sender,address _receiver,uint256 _transfer_amount);
    
    function High_low_2(High_low_2_token _token_address) public payable
    {
        token_address = _token_address;
    }
   
    function buy_token() public payable returns(bool)
    {
        High_low_2_token(token_address).transferFrom(token_address, msg.sender, ((msg.value*10**18)/0.001 ether));
        return true;
    }
    
    function exchange_token(uint256 tokens_to_exchange_in_wei) public payable returns(bool)
    {
        require(High_low_2_token(token_address).balanceOf(msg.sender)>=((tokens_to_exchange_in_wei*10**18)/0.001 ether));
        High_low_2_token(token_address).transferFrom(msg.sender,token_address,((tokens_to_exchange_in_wei*10**18)/0.001 ether));
        msg.sender.transfer(tokens_to_exchange_in_wei);
        emit Transfer_amount(this,msg.sender,tokens_to_exchange_in_wei);
        return true;
    }
    
    function contract_ether_balance() public constant returns(uint256)
    {
        return address(this).balance;
    }
    
    function contract_token_balance() public constant returns(uint256)
    {
        return High_low_2_token(token_address).balanceOf(token_address);       
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
        uint256 result;//10=low 11=high 12=draw
    }
    mapping(address=>mapping(uint256=>bet_details)) public bet_details_map; // key 1: better_address key2:broker_bets(iterate this)
    
    mapping(uint256=>uint256) public index_of_broker_bet;//key:bet_id  value: index_of_broker_bet(broker_created_bets)
    
    mapping(address=>uint256) public broker_created_bets;// total bet created by that particular broker (5)
    
    mapping(uint256=>address) public bet_creator;
    
    struct better
    {
        bool option;
        uint256 betted_tokens;
        uint256 tokens_won;
    }
    mapping(address=>mapping(uint256=>better)) public game_id_map_better;//key: index  value:betting     
    
    mapping(address=>uint256[]) public better_betted_bets;
    
    mapping(uint256=>uint256) public bet_tokens_for_low;
    
    mapping(uint256=>uint256) public bet_tokens_for_high; 
    
    mapping(uint256=>uint256) public low_betters;
    
    mapping(uint256=>uint256) public high_betters;
    
    struct bet_status
    {
        bool is_bet_stopped;
        bool is_result_published;
        uint256 final_option; //10,11,12 
    }
    mapping(uint256=>bet_status) public bet_status_map;//to check is_result_published 
    
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
        require(_expiry_time>now && _start_time>now && _expiry_time>_start_time);
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
        require(High_low_2_token(token_address).balanceOf(msg.sender)>=((_bet_tokens_in_wei*10**18)/0.001 ether));
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].start_time<=now);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time>=now);
        require(bet_status_map[bet_id].is_bet_stopped==false);
        require(game_id_map_better[msg.sender][bet_id].betted_tokens==0);
        require(_choice==1||_choice==0);
        
        High_low_2_token(token_address).transferFrom(msg.sender, token_address, ((_bet_tokens_in_wei*10**18)/0.001 ether));
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
        require(High_low_2_token(token_address).balanceOf(msg.sender)>=((_increase_tokens_in_wei*10**18)/0.001 ether));
        High_low_2_token(token_address).transferFrom(msg.sender,token_address,((_increase_tokens_in_wei*10**18)/0.001 ether));
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
        High_low_2_token(token_address).transferFrom(token_address, msg.sender, ((((tokens_betted*95)/100)*10**18)/0.001 ether));
        High_low_2_token(token_address).transferFrom(token_address, bet_creator[bet_id], ((((tokens_betted*5)/100)*10**18)/0.001 ether));
        
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
    function broker_setting_result_and_distribute_money(uint256 bet_id,uint256 result_options) public payable returns(bool)// is_result_setted_and_prize_distributed 
    {
        require(bet_creator[bet_id]==msg.sender);
        require(bet_details_map[bet_creator[bet_id]][index_of_broker_bet[bet_id]].expiry_time>=now);
        require(bet_status_map[bet_id].is_result_published==false);
        require(result_options<3 && result_options>=0);
        
        
        bet_status_map[bet_id].is_result_published=true;
        bet_status_map[bet_id].final_option=result_options;
        bool result_option;
        
        /*
        bet_creator[bet_id]
        
        uint256 index=gamers_map[_game_id];
        if(result_options==2)
        {
            //draw
            while(gamers_map[_game_id]>0)
            {
                if(game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount!=0)
                {
                    broker_map[game_id_map_broker[_game_id]].stake_amount+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount;
                    broker_map[game_id_map_broker[_game_id]].stake_tokens+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens;
                    game_id_map_trader[_game_id][gamers_map[_game_id]].better_address.transfer(game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount);
                    Transfer_amount(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount);//trader transfer
                }
                else if(game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens!=0)
                {
                    broker_map[game_id_map_broker[_game_id]].stake_amount+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount;
                    broker_map[game_id_map_broker[_game_id]].stake_tokens+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens;
                    High_low_token(token).transferFrom(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens);
                }
                gamers_map[_game_id]--;
            }
            gamers_map[_game_id]=index;
            return true;
        }
        else if(result_options==1)
        {
            //set high as result_option
            result_option=true;
        }
        else if(result_options==0)
        {
            //set low as result_option
            result_option=false;
        }
        if(result_options==0 && result_options==1)
        {
            while(gamers_map[_game_id]>0)
            {
                if(game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount!=0)
                {
                    if(result_option==game_id_map_trader[_game_id][gamers_map[_game_id]].option)//trader wins
                    {
                        if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0 && game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount!=0)
                        {
                            High_low_token(token).transferFrom(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens);
                            game_id_map_trader[_game_id][gamers_map[_game_id]].better_address.transfer((90*game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount)/100-(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens*100000000000000000));
                            Transfer_amount(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,(90*game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount)/100-(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens*100000000000000000));
                        }
                        else if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0)
                        {
                            High_low_token(token).transferFrom(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,((189*(game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount/0.1 ether))/100));
                        }
                    }
                    else //broker wins
                    {
                        broker_map[game_id_map_broker[_game_id]].stake_amount+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount;
                        broker_map[game_id_map_broker[_game_id]].stake_tokens+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens;
                        broker_map[game_id_map_broker[_game_id]].stake_amount+=((game_id_map_trader[_game_id][gamers_map[_game_id]].bet_amount*99)/100);
                    }
                }
                else if(game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens!=0)
                {
                    if(result_option==game_id_map_trader[_game_id][gamers_map[_game_id]].option)//trader wins
                    {
                        if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0 && game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount!=0)
                        {
                            High_low_token(token).transferFrom(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens+game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens));
                            game_id_map_trader[_game_id][gamers_map[_game_id]].better_address.transfer((90*game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens*100000000000000000)/100-(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens*100000000000000000));
                            Transfer_amount(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,(90*game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens*100000000000000000)/100-(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens*100000000000000000));
                        }
                        else if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0)
                        {
                            High_low_token(token).transferFrom(this,game_id_map_trader[_game_id][gamers_map[_game_id]].better_address,(189*game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens)/100);
                        }
                    }
                    else //broker wins
                    {
                        if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0 && game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_amount!=0)
                        {
                            broker_map[game_id_map_broker[_game_id]].stake_tokens+=(199*game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens)/100;
                        }
                        else if(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens!=0)
                        {
                            broker_map[game_id_map_broker[_game_id]].stake_tokens+=game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens;
                            broker_map[game_id_map_broker[_game_id]].stake_amount+=((90*game_id_map_trader[_game_id][gamers_map[_game_id]].betted_tokens*100000000000000000)/100-(game_id_map_trader[_game_id][gamers_map[_game_id]].reduced_stake_tokens*100000000000000000));
                        }
                    }
                }
                gamers_map[_game_id]--;
            }
            gamers_map[_game_id]=index;
            return true;
        }
        */
    }
    
}