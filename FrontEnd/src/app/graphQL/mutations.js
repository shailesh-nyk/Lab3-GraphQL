import { gql } from 'apollo-boost';

const updateBuyerProfile = `
    mutation updateBuyer($_id:String,$name: String, $email: String, $address: String, $zipcode: String){
        updateBuyer(_id:$_id, name: $name, email: $email, address: $address, zipcode: $zipcode){
            _id
            name
            email
            address
            zipcode
            image
        }
    }
`;

const updateSellerProfile = `
    mutation updateSeller($_id:String,$name: String, $email: String, $address: String, $phone: String, $zipcode: String, $rest_name: String, $cuisine: String){
        updateSeller(_id:$_id, name: $name, email: $email, address: $address, phone: $phone, zipcode: $zipcode, rest_name: $rest_name, cuisine: $cuisine){
            _id
            name
            email
            address
            phone
            zipcode
            rest_name
            image
            cuisine
        }
    }
`;

const addSectionQuery = `
    mutation addSection($_id:String,$section_name: String){ 
        addSection(_id:$_id,section_name:$section_name){
            sections {
                _id
                section_name
                sort_order
            }
        }
    }
`;

const addItemQuery = `
    mutation addItem($desc: String, $image: String, $name: String, $price: String, $_id: String, $section: String){ 
        addItem(description: $desc, image: $image, name: $name, price: $price, _id: $_id, section: $section){
            _id
            name                  
            description           
            price
            section 
            image
        }
    }
`;

const signupBuyerQuery = `
    mutation signupBuyer($name: String, $email: String, $address: String, $password: String, $phone: String, $zipcode: String){ 
        signupBuyer(name: $name, email: $email, address: $address, password: $password, phone: $phone, zipcode: $zipcode){
            _id
            name 
            email
            address
            phone
            zipcode
        }
    }
`

const signupSellerQuery = `
    mutation signupSeller($name: String, $email: String, $address: String, $password: String, $phone: String, $zipcode: String, $rest_name: String , $cuisine: String){ 
        signupSeller(name: $name, email: $email, address: $address, password: $password, phone: $phone, zipcode: $zipcode,  rest_name: $rest_name , cuisine: $cuisine){
            _id
            name 
            email
            address
            phone
            zipcode
            rest_name
            cuisine
        }
    }
`

export { updateBuyerProfile, updateSellerProfile, addSectionQuery, addItemQuery , signupBuyerQuery, signupSellerQuery};