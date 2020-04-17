import {getFirebase} from "./src/firebase";



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
                //console.log(flattenTranslations(snapshot.val()));
                for (const result of flattenTranslations(snapshot.val())) {
                    const nodeId = createNodeId(`${result.uid}`);
                    const nodeContent = JSON.stringify(result);
                    //console.log(result, "result")
                    const node = Object.assign({}, result, {
                        id: nodeId ,
                        originalId: result.uid,
                        parent: result.uid,
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
                    console.log(node, "node")
                    createNode(node);
                }
            })




        // do something with `database` here,
        // or store it as an instance variable or in state
        // to do stuff with it later
    })


    /*const fetchDataFirebase =  await getFirebase(firebase).database().ref("/").once("value")
        .then(snapshot => {
            return flattenTranslations(snapshot.val());
        });*/



};


