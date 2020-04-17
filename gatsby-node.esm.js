import app from "./src/firebase";

exports.onCreateWebpackConfig = ({
                                     stage,
                                     actions,
                                     getConfig
                                 }) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            externals: getConfig().externals.concat(function(context, request, callback) {
                const regex = /^@?firebase(\/(.+))?/;
                // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
                if (regex.test(request)) {
                    return callback(null, 'umd ' + request);
                }
                callback();
            })
        });
    }
};

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
        //console.log(node, "node")
        createNode(node);
    }
};


