pragma solidity >=0.4.21 <0.7.0;

contract Supplier {

    struct Batch{
        uint uid;
        string image;
        string design_name;
        uint price;
        uint amount;
        uint area;
        mapping(uint => bool) steps;
        mapping(uint => address) completed_by;
        uint cur_step;
    }

    struct Order{
        uint order_id;
        string color;
        uint batch_id;
        string[] completed_steps;
        string cur_step;
        uint area;
        bool shipped;
    }

    struct Worker{
        string fname;
        string lname;
        address addr;
    }

    struct Design{
        uint id;
        string name;
        uint price;
        string image_hash;
    }

    string public supp_name;
    address public manager;
    uint public total_batches=0;
    mapping(uint => Batch)public batches;
    address[] public workers_lookup;
    mapping(address => Worker) public workers;
    uint public total_design=0;
    mapping(uint => Design) public designs;

    constructor(string memory _name, address _manager) public {
        supp_name = _name;
        manager = _manager;
    }

    function add_worker(string memory _fname, string memory _lname, address _addr) public {
        workers[_addr] = Worker({
            fname: _fname,
            lname: _lname,
            addr: _addr
        });
        workers_lookup.push(_addr);
    } 

    function get_num_workers() public view returns(uint){
        return workers_lookup.length;
    }

    function add_design(string memory _name, uint _price, string memory _image_hash) public{
        total_design += 1;
        designs[total_design] = Design({
            id: total_design,
            name: _name,
            price: _price,
            image_hash: _image_hash
        });
        
    }

    function create_batch(string memory _design_name, uint _price) public {
        total_batches += 1;
        batches[total_batches] = Batch({
            uid: total_batches,
            image: '',
            design_name: _design_name,
            price: _price,
            amount:0,
            area: 0,
            cur_step: 0
        });
    }

    function get_status_for_batch(uint batch_id) public view returns(bool[] memory){
        bool[] memory arr = new bool[](4);
        for(uint i = 0; i < 4; i++) {
            arr[i] = batches[batch_id].steps[i];
        }
        return arr;
    }

    function get_completed_by(uint batch_id) public view returns(address[] memory){
        address[] memory arr = new address[](4);
        for(uint i = 0; i < 4; i++) {
            arr[i] = batches[batch_id].completed_by[i];
        }
        return arr;
    }

    function transfer_to_tanning(uint batch_id, uint _area) public{
        batches[batch_id].area = _area;
        batches[batch_id].amount = batches[batch_id].price * _area;
        batches[batch_id].cur_step = 1;
        batches[batch_id].steps[0] = true;
        batches[batch_id].completed_by[0] = msg.sender;
    }

    function transfer_to_QC(uint batch_id) public{
        batches[batch_id].cur_step = 2;
        batches[batch_id].steps[1] = true;
        batches[batch_id].completed_by[1] = msg.sender;
    }

    function quality_check(uint batch_id, string memory img_hash) public{
        batches[batch_id].image = img_hash;
        batches[batch_id].steps[2] = true;
        batches[batch_id].completed_by[2] = msg.sender;
        batches[batch_id].cur_step = 3;
    }

    function pack_batch(uint batch_id) public{
        batches[batch_id].steps[3] = true;
        batches[batch_id].completed_by[3] = msg.sender;
        batches[batch_id].cur_step = 4;
    }
    modifier onlyManager(){
        require(msg.sender == manager,'You are not authorized.');
        _;
    }

}