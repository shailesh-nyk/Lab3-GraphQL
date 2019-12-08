const getBuyerQuery = `
    query getBuyer($id: String){
        buyers(id: $id){
            _id
            name
            email
            address
            zipcode
            image
            phone
        }
    }
`;

const getSellerQuery = `
    query getSeller($id: String){
        sellers(id: $id){
            _id
            name
            email
            address
            phone
            zipcode
            image
            rest_name
            cuisine
            items { 
                _id
                name                  
                description           
                price
                section 
                image
            }
            sections {
                _id
                section_name
                sort_order
            }
        }
    }
`;


const searchQuery = `
    query search($key: String){
        search(key: $key){
            _id
            name
            email
            address
            phone
            zipcode
            image
            rest_name
            cuisine
            items { 
                _id
                name                  
                description           
                price
                section 
                image
            }
            sections {
                _id
                section_name
                sort_order
            }
        }
    }
`;

export { getBuyerQuery, getSellerQuery, searchQuery};