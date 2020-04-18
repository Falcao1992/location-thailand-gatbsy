import {getFirebase} from "./src/firebase";
const slugify = require("slugify");

exports.sourceNodes = async ({
                                 actions,
                                 createNodeId,
                                 createContentDigest
                             }) => {

    const { createNode } = actions;

    const flattenTranslations = (obj, parents = []) => {
        if (typeof obj !== 'object') {
            return []
        }
        return Object.entries(obj)
            .flatMap(([currentItemName, value]) => {
                if (typeof value !== 'object' && currentItemName === "urlImage") {
                    return [
                        obj
                    ]
                }
                return flattenTranslations(value, parents.concat(currentItemName))
            })
    };

    const lazyApp = import('firebase/app')
    const lazyDatabase = import('firebase/database')

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
        getFirebase(firebase).database().ref("/").once("value")
            .then(snapshot => {
                for (const result of flattenTranslations(snapshot.val())) {
                    const nodeId = createNodeId(`${result.uid}`);
                    const nodeContent = JSON.stringify(result);
                    //console.log(result, "result")
                    const node = Object.assign({}, result, {
                        id: nodeId ,
                        originalId: result.uid,
                        parent: null,
                        children: [],
                        page: result.page,
                        title: result.title,
                        type:result.type,
                        internal: {
                            type: "firebaseData",
                            content: nodeContent,
                            contentDigest: createContentDigest(result)
                        }
                    });
                    //console.log(node, "node")
                    createNode(node);
                }
            });

    })
};

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        firebaseData: {
            type: {
                resolve: source => {
                    return source.type
                }
            },
            page: {
                resolve: source => {
                    return source.page
                }
            },
            name: {
                resolve: source => {
                    return source.name
                }
            },
            urlImage: {
                resolve: source => {
                    return source.urlImage
                }
            }
        }
    };
    createResolvers(resolvers);
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type firebaseData implements Node {
      type: String!
      page: String!
      name: String
      urlImage: String!
    }
  `;
    createTypes(typeDefs);
};


