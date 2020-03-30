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
    //console.log(fetchDataFirebase, "fetchDataFirebase");


    for (const result of fetchDataFirebase) {
        const nodeId = createNodeId(`${result.idImage}`);
        const nodeContent = JSON.stringify(result);
        const node = Object.assign({}, result, {
            id: nodeId,
            originalId: result.key,
            parent: result.key,
            children: [],
            title: result.title,
            internal: {
                type: "firebaseData",
                content: nodeContent,
                contentDigest: createContentDigest(result)
            }
        });
        createNode(node);
    }
};


