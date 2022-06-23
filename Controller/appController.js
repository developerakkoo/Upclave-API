const User = require('./../Model/user');
const App = require('./../Model/App');




exports.postApp = async(req, res, next) =>{
    try {
        const host = req.hostname;

        if (!req.file) {
          res.status(404).json({
            status: false,
            message: 'Please provide a image'
          })
        }
      
    
            const title = req.body.title;
            const websiteUrl = req.body.websiteUrl;
            const featured = req.body.featured;
            const imageUrl = req.file.path.replace(/\\/g, "/");
    
    
            console.log(imageUrl);
            
            const app = new App({
                title: title,
                websiteUrl: websiteUrl,
                featured: featured,
                imageUrl: req.protocol + '://' + req.hostname +":" + "3000" + '/' +  imageUrl
            });
    
            app.save().then((result) => {
                console.log("App Created!");
                
                res.status(201).json({
                    result,
                    message: "App Created",
                });
    
            }).catch((err) => {
              res.status(500).json({
                status: false,
                message: err.message
            })
            })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.getApps = async(req, res, next) =>{
    try {
        
        console.log(req.params.plan);
        const app = await App.find({
           
        });

        if(app){
            console.log(app);
            res.status(200).json({
                status: true,
                app
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.getFeaturedApp = async(req, res, next) =>{
    try {
        
        console.log(req.params.plan);
        const app = await App.find({
            featured: true
           
        });

        if(app){
            console.log(app);
            res.status(200).json({
                status: true,
                app
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.getAppbyUsers = async(req, res, next) =>{
    try {
        let appId = req.params.id;


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.putApp = async(req, res, next) =>{
    try {
        let appId = req.params.id;
        
        const app = await App.findByIdAndUpdate(appId, req.body, {upsert: true});

        if(app){
            res.status(201).json({
                status: true,
                message: "App Updated",
                app
            })
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}




exports.deleteApp = async(req, res, next) =>{
    try {
        let appId = req.params.id;
        
        const app = await App.findByIdAndDelete(appId);

        if(app){
            res.status(201).json({
                status: true,
                message: "App Deleted",
                app
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}