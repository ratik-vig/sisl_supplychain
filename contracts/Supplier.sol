pragma solidity >=0.4.21 <0.7.0;

contract Supplier {

    struct Batch{
        uint uid;
        string color;
        uint area;
        string image_hash;
        mapping(string => string) steps;
        string cur_step;
        bool completed;
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
    uint public total_batches;
    address[] public workers_lookup;
    mapping(address => Worker) public workers;
    Batch[] public batches;
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

    function create_batch(string memory _color, uint _area) public onlyManager{
        Batch memory new_batch = Batch({
            uid: batches.length-1,
            color: _color,
            area: _area,
            image_hash: '',
            cur_step: 'Tanning',
            completed: false
        });
        batches.push(new_batch);
        total_batches += 1;
    }

    function transfer_to_tanning(uint batch_id) public{
        batches[batch_id].cur_step = "Polishing";
        batches[batch_id].steps['Preparatory Stage'] = 'true';
    }

    function transfer_to_QC(uint batch_id) public{
        batches[batch_id].cur_step = "QC";
        batches[batch_id].steps["Polishing"] = "true";
    }

    function quality_check(uint batch_id, string memory img_hash) public{
        batches[batch_id].image_hash = img_hash;
        batches[batch_id].steps["QC"] = "true";
        batches[batch_id].completed = true;
    }

    modifier onlyManager(){
        require(msg.sender == manager,'You are not authorized.');
        _;
    }

}