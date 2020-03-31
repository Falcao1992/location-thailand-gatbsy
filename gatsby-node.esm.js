import app from "./src/firebase";

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


    const fetchDataFirebase =  await app.database().ref("/").once("value")
        .then(snapshot => {
            return flattenTranslations(snapshot.val());
        });


    for (const result of fetchDataFirebase) {
        const nodeId = createNodeId(`${result.idImage}`);
        const nodeContent = JSON.stringify(result);
        //console.log(result, "result")
        const node = Object.assign({}, result, {
            id: nodeId ,
            originalId: result.idImage,
            parent: result.idImage,
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
};


