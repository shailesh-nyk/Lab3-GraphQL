const graphql = require('graphql');
const _ = require('lodash');
var buyer = require('../models/buyer');
var seller = require('../models/seller');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const BuyerType = new GraphQLObjectType({
    name: 'buyers',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: {type: GraphQLString},
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        image: { type: GraphQLString },
    })
});


const SellerType = new GraphQLObjectType({
    name: 'sellers',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: {type: GraphQLString},
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        image: { type: GraphQLString },
        rest_name: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        items: { type: new GraphQLList(ItemType)},
        sections: {type: new GraphQLList(SectionType)}
    })
});

const SectionType = new GraphQLObjectType({
    name: 'sections',
    fields: () => ({
        _id: { type: GraphQLString },
        section_name: { type: GraphQLString },
        sort_order: { type: GraphQLInt }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'items',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        section: { type: GraphQLString },
        image: { type: GraphQLString },
    })
});




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buyers: {
            type: (BuyerType),
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                const prom = (id) => {
                    return new Promise((resolve, reject) => {
                        buyer.findById(id, (err, doc) => {
                            if (err) return reject(err);
                            else
                                return resolve(doc);
                        })
                    });
                }
                let results = await prom(args.id);
                results = JSON.parse(JSON.stringify(results));
                return results;
            }
        },
        sellers: {
            type: (SellerType),
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                const prom = (id) => {
                    return new Promise((resolve, reject) => {
                        seller.findById(id, (err, doc) => {
                            if (err) return reject(err);
                            else
                                return resolve(doc);
                        })
                    });
                }
                let results = await prom(args.id);
                results = JSON.parse(JSON.stringify(results));
                return results;
            }
        },
        search: {
            type: (new GraphQLList(SellerType)),
            args: { key: { type: GraphQLString } },
            async resolve(parent, args) {
                const prom = (key) => {
                    let search = {
                        $or: [
                            { "items.name" : { "$regex": key, "$options": "i" } },
                            { rest_name : { "$regex": key, "$options": "i" } }
                        ]
                    }
                    return new Promise((resolve, reject) => {
                        seller.find(search, function(err, result) {
                            if (err) return reject(err);
                            else
                                return resolve(result);
                        })
                    });
                }
                let results = await prom(args.key);
               //results = JSON.parse(JSON.stringify(results));
                return results;
            }
        }

    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signupBuyer: {
            type: BuyerType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                address: { type: GraphQLString },
                password: { type: GraphQLString },
                phone: { type: GraphQLString },
                zipcode: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        let newUser = new buyer({
                            name: details.name,
                            email: details.email,
                            password: details.password,
                            address: details.address,
                            zipcode: details.zipcode,
                            phone: details.phone
                        })
                        newUser.save((err, doc) => {
                            if (err) return reject(err)
                            else
                                return resolve(doc)
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        },
        signupSeller: {
            type: SellerType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                address: { type: GraphQLString },
                phone: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                password: { type: GraphQLString }, 
                rest_name: { type: GraphQLString },
                cuisine: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    let newUser = new seller({
                        name: details.name,
                        email: details.email,
                        password: details.password,
                        address: details.address,
                        zipcode: details.zipcode,
                        phone: details.phone,
                        rest_name: details.rest_name,
                        cuisine: details.cuisine
                    })
                    return new Promise((resolve, reject) => {
                        newUser.save((err, doc) => {
                            if (err) return reject(err)
                            else
                              return resolve(doc)
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        },
        updateBuyer: {
            type: BuyerType,
            args: {
                _id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                address: { type: GraphQLString },
                phone: { type: GraphQLString },
                zipcode: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        buyer.findByIdAndUpdate(details._id, details, {new: true}, (err, doc) => {
                            if (err) return reject(err)
                            else
                                return resolve(doc)
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        },
        updateSeller: {
            type: SellerType,
            args: {
                _id: { type: GraphQLString },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                address: { type: GraphQLString },
                phone: { type: GraphQLString },
                zipcode: { type: GraphQLString }, 
                rest_name: { type: GraphQLString },
                cuisine: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        seller.findByIdAndUpdate(details._id, details,  {new: true},  (err, doc) => {
                            if (err) return reject(err)
                            else
                                return resolve(doc)
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        },
        addSection: {
            type: SellerType,
            args: {
                _id: { type: GraphQLString },
                section_name: { type: GraphQLString }   
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        let update = {
                            $push: { sections: {
                            section_name: details.section_name 
                            }   }
                        }
                        seller.findByIdAndUpdate(details._id, update,  {new: true},  (err, doc) => {
                            if (err) return reject(err)
                            else
                                return resolve(doc)
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        },
        addItem: {
            type: ItemType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                section: { type: GraphQLString },
                image: { type: GraphQLString },
                _id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const prom = (details) => {
                    return new Promise((resolve, reject) => {
                        let id = details._id;
                        delete details._id;
                        let update = {
                            $push: {
                               items: details
                            }
                        }
                        seller.findByIdAndUpdate(id, update,  {new: true},  (err, doc) => {
                            if (err) return reject(err)
                            else
                                return resolve(doc.items[doc.items.length - 1])
                        });
                    });
                }
                let results = await prom(args);
                return results;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


