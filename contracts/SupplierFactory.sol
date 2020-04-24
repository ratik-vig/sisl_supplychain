pragma solidity >=0.4.21 <0.7.0;
import "./Supplier.sol";

contract SupplierFactory{
    address[] public existing_suppliers;
    uint public num_suppliers=0;

    function create_supplier(string memory _name) public {
        Supplier new_supplier = new Supplier(_name, msg.sender);
        existing_suppliers.push(address(new_supplier));
        num_suppliers += 1;
    }
}

